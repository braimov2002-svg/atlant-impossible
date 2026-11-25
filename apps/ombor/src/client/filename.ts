const MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
  о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'x', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'i', ь: '',
  э: 'e', ю: 'yu', я: 'ya', ў: 'o', қ: 'q', ғ: 'g', ҳ: 'h',
};

/**
 * A file name in Latin letters only. Some browsers and messengers replace a
 * Cyrillic name with "download", so «Заявка АС-001-11-2026» is saved as
 * "Zayavka-AS-001-11-2026".
 */
export function latinName(name: string, ext: string) {
  const latin = [...name]
    .map((ch) => {
      const low = ch.toLowerCase();
      const to = MAP[low];
      return to === undefined ? ch : low === ch ? to : to.toUpperCase();
    })
    .join('')
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${latin || 'file'}.${ext}`;
}
