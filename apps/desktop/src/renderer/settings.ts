import { OUTPUT_LANGUAGES, PROVIDERS, SPOKEN_LANGUAGES, type ProviderId } from '@ovozyoz/core';
import { HOTKEY_PRESETS, hotkeyLabel } from '../shared/hotkeys';
import type { DesktopSettings, SettingsBridge, SettingsSnapshot } from '../shared/types';

const bridge = (window as unknown as { ovozyoz: SettingsBridge }).ovozyoz;
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const form = $<HTMLFormElement>('form');
const keyInput = $<HTMLInputElement>('api-key');
const keyStatus = $('key-status');
const keyLabel = $('key-label');
const modelSelect = $<HTMLSelectElement>('model');
const textModelSelect = $<HTMLSelectElement>('text-model');
const textModelField = $('text-model-field');
const spokenSelect = $<HTMLSelectElement>('spoken');
const outputGroup = $('output');
const hotkeySelect = $<HTMLSelectElement>('hotkey');
const cycleSelect = $<HTMLSelectElement>('cycle-hotkey');
const errors = $('errors');
const status = $('status');

const CYCLE_PRESETS = ['Control+Alt+L', 'Control+Shift+L', 'Control+Alt+K', 'F9'];

let snapshot: SettingsSnapshot;
let draft: DesktopSettings;
/** Keys typed in this session; '' means "remove the stored key". */
const typedKeys: Partial<Record<ProviderId, string>> = {};

function option(value: string, text: string, selected: boolean): HTMLOptionElement {
  const el = document.createElement('option');
  el.value = value;
  el.textContent = text;
  el.selected = selected;
  return el;
}

function fillModels(): void {
  const provider = PROVIDERS[draft.provider];
  const current = draft.provider === 'openai' ? draft.openaiModel : draft.geminiModel;
  const models = [...provider.models];
  if (current && !models.includes(current)) models.push(current);
  modelSelect.replaceChildren(
    option('', `Standart (${provider.defaultModel})`, !current),
    ...models.filter((m) => m !== provider.defaultModel).map((m) => option(m, m, m === current)),
  );

  textModelField.hidden = draft.provider !== 'openai';
  if (draft.provider === 'openai' && provider.textModels) {
    const text = draft.openaiTextModel;
    const list = [...provider.textModels];
    if (text && !list.includes(text)) list.push(text);
    textModelSelect.replaceChildren(
      option('', `Standart (${provider.defaultTextModel})`, !text),
      ...list.filter((m) => m !== provider.defaultTextModel).map((m) => option(m, m, m === text)),
    );
  }
}

function renderKey(): void {
  const provider = draft.provider;
  keyLabel.textContent = `${PROVIDERS[provider].label} API kaliti`;
  keyInput.placeholder = provider === 'gemini' ? 'AIza...' : 'sk-...';
  keyInput.value = typedKeys[provider] ?? '';
  const saved = snapshot.keyPreview[provider];
  const removing = typedKeys[provider] === '';
  keyStatus.textContent = removing
    ? "Saqlaganingizda kalit o'chiriladi."
    : saved
      ? `Saqlangan kalit: ${saved}. Almashtirish uchun yangisini kiriting.`
      : `${PROVIDERS[provider].keyHint}.`;
  if (!snapshot.secureStorage) keyStatus.textContent += ' (Diqqat: tizim shifrlashi mavjud emas.)';
  $('remove-key').hidden = !saved;
  $('gemini-steps').hidden = provider !== 'gemini';
}

function hotkeyOptions(select: HTMLSelectElement, presets: readonly string[], current: string, allowOff: boolean): void {
  const list = [...presets];
  if (current && !list.includes(current)) list.unshift(current);
  select.replaceChildren(
    ...(allowOff ? [option('', "O'chirilgan", !current)] : []),
    ...list.map((accel) => option(accel, hotkeyLabel(accel, snapshot.platform), accel === current)),
  );
}

function render(): void {
  (form.elements.namedItem('provider') as RadioNodeList).value = draft.provider;
  (form.elements.namedItem('apostrophes') as RadioNodeList).value = draft.apostrophes;
  renderKey();
  fillModels();

  spokenSelect.replaceChildren(...SPOKEN_LANGUAGES.map((l) => option(l.id, l.label, l.id === draft.spoken)));
  outputGroup.replaceChildren(
    ...OUTPUT_LANGUAGES.map((l) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'output';
      input.value = l.id;
      input.checked = l.id === draft.output;
      const span = document.createElement('span');
      span.textContent = l.short;
      const small = document.createElement('small');
      small.textContent = l.label;
      span.append(small);
      label.append(input, span);
      return label;
    }),
  );

  hotkeyOptions(hotkeySelect, HOTKEY_PRESETS, draft.hotkey, false);
  hotkeyOptions(cycleSelect, CYCLE_PRESETS, draft.cycleHotkey, true);
  $<HTMLInputElement>('auto-paste').checked = draft.autoPaste;
  $<HTMLInputElement>('restore-clipboard').checked = draft.restoreClipboard;
  $<HTMLInputElement>('restore-clipboard').disabled = !draft.autoPaste;
  $<HTMLInputElement>('open-at-login').checked = draft.openAtLogin;
  $('permissions').hidden = snapshot.platform !== 'darwin';
  showErrors(snapshot.hotkeyErrors);
}

function showErrors(list: string[]): void {
  errors.hidden = list.length === 0;
  errors.textContent = list.join('\n');
}

function readForm(): DesktopSettings {
  const value = (name: string) => (form.elements.namedItem(name) as RadioNodeList).value;
  const next: DesktopSettings = {
    ...draft,
    provider: value('provider') as ProviderId,
    apostrophes: value('apostrophes') as DesktopSettings['apostrophes'],
    spoken: spokenSelect.value as DesktopSettings['spoken'],
    output: value('output') as DesktopSettings['output'],
    hotkey: hotkeySelect.value,
    cycleHotkey: cycleSelect.value,
    autoPaste: $<HTMLInputElement>('auto-paste').checked,
    restoreClipboard: $<HTMLInputElement>('restore-clipboard').checked,
    openAtLogin: $<HTMLInputElement>('open-at-login').checked,
  };
  if (draft.provider === 'openai') {
    next.openaiModel = modelSelect.value;
    next.openaiTextModel = textModelSelect.value;
  } else {
    next.geminiModel = modelSelect.value;
  }
  return next;
}

form.addEventListener('change', (event) => {
  const target = event.target as HTMLInputElement;
  if (target.id === 'api-key') return;
  draft = readForm();
  if (target.name === 'provider') {
    renderKey();
    fillModels();
  }
  $<HTMLInputElement>('restore-clipboard').disabled = !draft.autoPaste;
  status.textContent = '';
});

keyInput.addEventListener('input', () => {
  typedKeys[draft.provider] = keyInput.value.trim();
  if (!typedKeys[draft.provider]) delete typedKeys[draft.provider];
});

$('toggle-key').addEventListener('click', () => {
  const show = keyInput.type === 'password';
  keyInput.type = show ? 'text' : 'password';
  $('toggle-key').textContent = show ? 'Yashirish' : "Ko'rsatish";
});

$('get-key').addEventListener('click', () => bridge.openKeyPage(draft.provider));
$('remove-key').addEventListener('click', () => {
  typedKeys[draft.provider] = '';
  renderKey();
});
$('perm-mic').addEventListener('click', () => bridge.openPermission('microphone'));
$('perm-ax').addEventListener('click', () => bridge.openPermission('accessibility'));
$('close').addEventListener('click', () => bridge.close());

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  draft = readForm();
  status.textContent = 'Saqlanmoqda...';
  const result = await bridge.save({ settings: draft, keys: { ...typedKeys } });
  for (const key of Object.keys(typedKeys) as ProviderId[]) delete typedKeys[key];
  snapshot = await bridge.get();
  draft = snapshot.settings;
  render();
  showErrors(result.hotkeyErrors);
  status.textContent = result.ok ? 'Saqlandi ✓' : "Saqlandi, lekin tugmalarni tekshiring";
  if (!snapshot.keyPreview[draft.provider]) status.textContent = "Saqlandi. API kalitni kiritishni unutmang";
});

void (async () => {
  snapshot = await bridge.get();
  draft = snapshot.settings;
  render();
  if (!snapshot.keyPreview[draft.provider]) keyInput.focus();
})();
