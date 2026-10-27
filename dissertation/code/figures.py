"""
figures.py - all figures of the dissertation in three languages
(figures/en, figures/ru, figures/uz), produced from data/*.csv and
data/results.json.
"""
import json, os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon, Rectangle, FancyArrowPatch
from i18n import t, num, flab

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', 'data')
FIG = os.path.join(HERE, '..', 'figures')
R = json.load(open(os.path.join(DATA, 'results.json')))
MC = json.load(open(os.path.join(DATA, 'mc_results.json')))

plt.rcParams.update({
    'font.family': 'Liberation Serif', 'mathtext.fontset': 'stix', 'font.size': 10.5,
    'axes.labelsize': 10.5, 'legend.fontsize': 8.8, 'xtick.labelsize': 9.5, 'ytick.labelsize': 9.5,
    'axes.linewidth': 0.8, 'lines.linewidth': 1.4, 'figure.dpi': 110, 'savefig.dpi': 300,
    'axes.grid': True, 'grid.alpha': 0.25, 'grid.linewidth': 0.5, 'legend.frameon': False,
})
W1, H1 = 6.3, 3.6            # inches (16 x 9 cm)
C = ['#1f4e79', '#c0392b', '#2e8b57', '#d68910', '#6c3483', '#17a589', '#7f8c8d', '#a04000']
AGK = 25.514


def loc_ticks(ax, lang):
    if lang == 'en':
        return
    fmt = matplotlib.ticker.FuncFormatter(lambda x, p: ('%g' % x).replace('.', ','))
    for axis in (ax.xaxis, ax.yaxis):
        if not isinstance(axis.get_major_formatter(), matplotlib.ticker.LogFormatter):
            axis.set_major_formatter(fmt)


def save(fig, name, lang):
    d = os.path.join(FIG, lang)
    os.makedirs(d, exist_ok=True)
    fig.savefig(os.path.join(d, name + '.png'), bbox_inches='tight', pad_inches=0.03)
    plt.close(fig)


def csv(name):
    with open(os.path.join(DATA, name)) as fh:
        hdr = fh.readline().strip().split(',')
    a = np.loadtxt(os.path.join(DATA, name), delimiter=',', skiprows=1)
    return hdr, a


def agk_line(ax, lang, y=0.92, text=True, left=False):
    ax.axvline(AGK, color='0.35', ls='--', lw=0.9)
    if text:
        ax.text(AGK * (0.97 if left else 1.0) + (0 if left else 0.4), y, t('agK', lang), transform=ax.get_xaxis_transform(),
                fontsize=8.3, color='0.25', ha='right' if left else 'left')


# ------------------------------------------------------------------ figures
def fig_tube(lang):
    fig, ax = plt.subplots(figsize=(W1, 3.3))
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 8)
    ax.axis('off')
    ax.add_patch(Rectangle((0.3, 1.0), 6.6, 6.4, fill=False, lw=1.2, ls='-', ec='0.3'))
    ax.text(0.45, 7.0, t('housing', lang) + ' (' + t('vacuum', lang) + ')', fontsize=8.5, color='0.3')
    # cathode
    ax.add_patch(Rectangle((2.6, 6.0), 1.6, 0.7, color='0.55'))
    ax.text(4.35, 6.25, t('cathode', lang), fontsize=9)
    # electron beam
    ax.add_patch(FancyArrowPatch((3.4, 5.95), (3.4, 3.65), arrowstyle='-|>', mutation_scale=12, color=C[0], lw=1.6))
    ax.text(1.0, 4.8, t('ebeam', lang), fontsize=8.8, color=C[0])
    # anode (inclined face at angle theta to central ray)
    th = np.radians(12)
    x0, y0 = 3.4, 3.5
    L = 2.4
    face = np.array([[x0 - L * np.cos(th), y0 - L * np.sin(th)], [x0 + L * np.cos(th), y0 + L * np.sin(th)]])
    poly = Polygon([face[0], face[1], [face[1][0], 1.4], [face[0][0], 1.4]], closed=True, color='#b87333', alpha=0.9)
    ax.add_patch(poly)
    ax.text(2.0, 1.75, t('anode', lang), fontsize=9, color='white')
    ax.plot([x0], [y0], 'o', color='gold', ms=6, mec='k', mew=0.5)
    ax.text(x0 - 0.2, y0 + 0.35, t('focal', lang), fontsize=8.3, ha='right')
    # central ray
    ax.annotate('', xy=(14.6, y0), xytext=(x0 + 0.15, y0), arrowprops=dict(arrowstyle='-|>', color=C[1], lw=1.4))
    ax.text(9.6, y0 + 0.25, t('central', lang), fontsize=8.8, color=C[1])
    # angle arc
    a = np.linspace(0, th, 30)
    ax.plot(x0 + 1.7 * np.cos(a), y0 + 1.7 * np.sin(a), color='k', lw=0.8)
    ax.text(x0 + 1.85, y0 + 0.05, r'$\theta$', fontsize=11)
    # window, filter, sample
    ax.add_patch(Rectangle((6.85, 2.7), 0.12, 1.6, color='#9ecae1'))
    ax.text(6.95, 4.45, t('window', lang), fontsize=8.5, ha='right')
    ax.add_patch(Rectangle((8.2, 2.7), 0.25, 1.6, color='#95a5a6'))
    ax.text(8.3, 2.3, t('filter', lang), fontsize=8.5, ha='center')
    ax.text(7.25, 1.45, t('air', lang), fontsize=8.5, color='0.35')
    ax.add_patch(Rectangle((13.2, 2.2), 1.3, 2.6, color='#f5b7b1', ec='#922b21'))
    ax.text(12.0, 5.2, t('sample', lang), fontsize=8.5)
    ax.annotate('', xy=(13.2, 0.7), xytext=(x0, 0.7), arrowprops=dict(arrowstyle='<->', color='0.2', lw=0.9))
    ax.text(7.0, 0.25, t('dist', lang), fontsize=8.5)
    save(fig, 'fig01_tube', lang)


def fig_coeffs(lang):
    h, a = csv('coeffs.csv')
    E = a[:, 0]
    fig, ax = plt.subplots(figsize=(W1, H1))
    ax.loglog(E, a[:, 1], color=C[1], label=t('mu_ag', lang))
    ax.loglog(E, a[:, 2], color=C[1], ls='--', label=t('muen_ag', lang))
    ax.loglog(E, a[:, 3], color=C[0], label=t('mu_t', lang))
    ax.loglog(E, a[:, 4], color=C[0], ls='--', label=t('muen_t', lang))
    ax.set_xlim(1, 50)
    ax.set_xlabel(t('E', lang))
    ax.set_ylabel(t('mu', lang))
    agk_line(ax, lang, y=0.93, left=True)
    ax.annotate('L$_{1-3}$', xy=(3.5, 1500), xytext=(5.0, 3000), fontsize=9, arrowprops=dict(arrowstyle='->', lw=0.7))
    ax.legend(loc='lower left')
    save(fig, 'fig02_coeffs', lang)


def fig_ratio(lang):
    h, a = csv('muen_ratio.csv')
    E = a[:, 0]
    fig, ax = plt.subplots(figsize=(W1, H1))
    for i, (col, c) in enumerate(zip(h[1:], C)):
        ax.plot(E, a[:, i + 1], color=c, label=col, lw=1.8 if col == 'Ag' else 1.1)
    ax.set_xlabel(t('E', lang))
    ax.set_ylabel(t('ratio_muen', lang))
    ax.set_xlim(5, 45)
    agk_line(ax, lang, y=0.05)
    ax.legend(ncol=3, loc='upper left')
    loc_ticks(ax, lang)
    save(fig, 'fig03_ratio', lang)


def fig_electron(lang):
    h, a = csv('electron_cu.csv')
    T, S, d, sk = a[:, 0], a[:, 1], a[:, 2], a[:, 3]
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(W1, 2.9))
    ax1.plot(T, S, color=C[0])
    ax1.set_xlabel(t('Te', lang))
    ax1.set_ylabel(t('S', lang), fontsize=9)
    ax1b = ax1.twinx()
    ax1b.plot(T, d, color=C[1], ls='--')
    ax1b.set_ylabel(t('depth_um', lang), color=C[1], fontsize=9)
    ax1b.grid(False)
    ax1.set_ylim(0, 25)
    ax1.text(0.5, 0.92, '(a)', transform=ax1.transAxes)
    ax2.plot(T, sk, color=C[2])
    ax2.set_xlabel(t('Te', lang))
    ax2.set_ylabel(t('sigK', lang), fontsize=9)
    ax2.text(0.05, 0.92, '(b)', transform=ax2.transAxes)
    for ax in (ax1, ax1b, ax2):
        loc_ticks(ax, lang)
    fig.tight_layout()
    save(fig, 'fig04_electron', lang)


def fig_validation(lang):
    h, a = csv('study_filters.csv')
    E = a[:, 0]
    ncase = (len(h) - 1) // 2
    names = [x[3:] for x in h[1:1 + ncase]]
    brem = E > 9.6
    fig, axs = plt.subplots(2, 2, figsize=(W1, 4.4), gridspec_kw=dict(height_ratios=[3, 1.3]), sharex='col')
    for j, lab in enumerate(['none', 'Al 1.0']):
        i = names.index(lab)
        sp_, dm_ = a[:, 1 + i], a[:, 1 + ncase + i]
        sp_ = sp_ / sp_[brem].sum()
        dm_ = dm_ / dm_[brem].sum()
        m = sp_[brem].max()
        ax = axs[0, j]
        ax.plot(E, sp_ / m, color=C[0], label=t('spekpy', lang))
        ax.plot(E, dm_ / m, color=C[1], ls='--', label=t('model', lang))
        if lab == 'none':
            ax.set_yscale('log')
            ax.set_ylim(1e-2, 2e3)
        else:
            ax.set_ylim(0, 1.25)
        ax.set_title(flab(lab, lang), fontsize=9.5)
        if j == 0:
            ax.set_ylabel(t('relbrem', lang), fontsize=9)
        ax.legend(loc='upper right')
        ok = (sp_ > sp_[brem].max() * 2e-2) & brem
        r = np.where(ok, dm_ / np.where(sp_ > 0, sp_, 1), np.nan)
        axs[1, j].plot(E, r, color='k', lw=0.9)
        axs[1, j].axhline(1, color='0.5', lw=0.6)
        axs[1, j].set_ylim(0.7, 1.3)
        axs[1, j].set_xlabel(t('E', lang))
        if j == 0:
            axs[1, j].set_ylabel(t('ratio_dm_sp', lang), fontsize=8.5)
        for ax_ in (ax, axs[1, j]):
            ax_.set_xlim(2, 46)
            loc_ticks(ax_, lang)
    fig.tight_layout()
    save(fig, 'fig05_validation_cu', lang)


def fig_validation_w(lang):
    fig, ax = plt.subplots(figsize=(W1, H1))
    for i, kv in enumerate([50, 80, 100]):
        h, a = csv(f'W_{kv}kV.csv')
        sp_, dm_ = a[:, 1] / a[:, 1].sum(), a[:, 2] / a[:, 2].sum()
        m = sp_.max()
        kvl = 'кВ' if lang == 'ru' else 'kV'
        ax.plot(a[:, 0], sp_ / m, color=C[i], label=f'{kv} {kvl}, {t("spekpy", lang)}')
        ax.plot(a[:, 0], dm_ / m, color=C[i], ls='--', label=f'{kv} {kvl}, {t("model", lang)}')
    ax.set_xlabel(t('E', lang))
    ax.set_ylabel(t('relarea', lang))
    ax.set_xlim(5, 100)
    ax.legend(ncol=1, loc='upper right', fontsize=8)
    loc_ticks(ax, lang)
    save(fig, 'fig06_validation_w', lang)


def fig_baseline(lang):
    h, a = csv('baseline.csv')
    E = a[:, 0]
    fig, ax = plt.subplots(figsize=(W1, H1))
    ax.semilogy(E, a[:, 2], color=C[0], label=t('spekpy', lang))
    ax.semilogy(E, a[:, 1], color=C[1], ls='--', lw=1.0, label=t('model', lang))
    ax.set_xlabel(t('E', lang))
    ax.set_ylabel(t('flu', lang))
    ax.set_xlim(1, 46)
    ax.set_ylim(1e6, 3e12)
    ax.annotate(t('kalpha', lang) + ' 8,05 keV'.replace('keV', 'кэВ' if lang == 'ru' else 'keV').replace(',', '.' if lang == 'en' else ','),
                xy=(8.05, 1.2e12), xytext=(13, 1.0e12), fontsize=8.5, arrowprops=dict(arrowstyle='->', lw=0.7))
    ax.annotate(t('kbeta', lang) + ' 8,91 keV'.replace('keV', 'кэВ' if lang == 'ru' else 'keV').replace(',', '.' if lang == 'en' else ','),
                xy=(8.9, 1.7e11), xytext=(13, 2.0e11), fontsize=8.5, arrowprops=dict(arrowstyle='->', lw=0.7))
    ax.text(28, 4e8, t('brems', lang), fontsize=9)
    agk_line(ax, lang, y=0.05)
    ax.legend(loc='upper right', bbox_to_anchor=(1.0, 0.75))
    loc_ticks(ax, lang)
    save(fig, 'fig07_baseline', lang)


def _study(name, title_fmt, lang, fname, norm=False, logy=False, cases=None, xlim=(2, 51)):
    h, a = csv(f'study_{name}.csv')
    E = a[:, 0]
    n = (len(h) - 1) // 2
    names = [x[3:] for x in h[1:1 + n]]
    fig, ax = plt.subplots(figsize=(W1, H1))
    idx = [names.index(c) for c in cases] if cases else range(n)
    for k, i in enumerate(idx):
        y = a[:, 1 + i]
        if norm:
            ref = a[:, 1 + names.index('Al 1.0')] if 'Al 1.0' in names else y
            y = y / ref[E > 12].max()
        ax.plot(E, y, color=C[k % len(C)], label=title_fmt(names[i]))
    if logy:
        ax.set_yscale('log')
        top = max(a[:, 1 + i].max() for i in idx)
        ax.set_ylim(top * 3e-5 if name != 'filters' else top * 1e-6, top * 3)
    ax.set_xlabel(t('E', lang))
    ax.set_ylabel(t('flu', lang) if not norm else t('relal', lang))
    if norm:
        ax.set_ylim(0, 1.6)
    ax.set_xlim(*xlim)
    agk_line(ax, lang, y=0.92, text=False)
    ax.legend(loc='upper right')
    loc_ticks(ax, lang)
    save(fig, fname, lang)
    return fig


def fig_studies(lang):
    deg = '°'
    _study('angle', lambda s: f'{t("angle", lang)} {s}{deg}', lang, 'fig08_angle', logy=True)
    _study('kvp', lambda s: f'{s} kV' if lang != 'ru' else f'{s} кВ', lang, 'fig09_kvp', logy=True)
    _study('be', lambda s: f'{t("be", lang)} {num(float(s), lang, 2)} ' + ('мм' if lang == 'ru' else 'mm'),
           lang, 'fig10_be', logy=True, xlim=(1, 20))
    _study('filters', lambda s: flab(s, lang), lang, 'fig11_al', logy=True,
           cases=['none', 'Al 0.25', 'Al 0.5', 'Al 1.0', 'Al 2.0'])
    _study('filters', lambda s: flab(s, lang), lang, 'fig12_cu_ni', logy=True,
           cases=['none', 'Ni 0.02', 'Cu 0.05', 'Cu 0.1', 'Cu 0.2'])
    _study('filters', lambda s: flab(s, lang), lang, 'fig13_kedge', logy=False, norm=True,
           cases=['Al 1.0', 'Mo 0.05', 'Ag 0.05', 'Sn 0.05', 'Sn 0.1'], xlim=(5, 46))


def fig_integrand(lang):
    fig, axs = plt.subplots(1, 2, figsize=(W1, 2.8), sharey=False)
    for ax, lab in zip(axs, ['none', 'Al_1.0']):
        h, a = csv(f'integrand_{lab}.csv')
        E = a[:, 0]
        m = a[:, 1].max()
        ax.fill_between(E, a[:, 1] / m, color=C[0], alpha=0.35, lw=0, label=t('tissue', lang))
        ax.plot(E, a[:, 2] / m, color=C[1], lw=1.0, label=t('tissue_ag', lang))
        ax.set_xlim(2, 46)
        ax.set_yscale('log')
        ax.set_ylim(1e-4, 3)
        ax.set_xlabel(t('E', lang))
        ax.set_title(flab(lab.replace('_', ' '), lang), fontsize=9.5)
        agk_line(ax, lang, text=False)
        loc_ticks(ax, lang)
    axs[0].set_ylabel(t('integrand', lang), fontsize=9)
    axs[0].legend(loc='lower left', fontsize=8)
    fig.tight_layout()
    save(fig, 'fig14_integrand', lang)


def fig_def_conc(lang):
    ws = [0] + [w * 100 for w in R['WS']]
    fig, ax = plt.subplots(figsize=(W1, H1))
    show = ['none', 'Ni 0.02', 'Cu 0.1', 'Al 0.5', 'Sn 0.1', 'Al 1.0', 'Al 2.0', 'Cu 0.2']
    for k, row in enumerate([r for r in R['DEF_table'] if r['label'] in show]):
        y = [1.0] + [row[f'SP_{w}'] for w in R['WS']]
        ax.plot(ws, y, 'o-', ms=3.5, color=C[k % len(C)], label=flab(row['label'], lang))
    ax.set_xlabel(t('w', lang))
    ax.set_ylabel(t('DEF', lang))
    ax.legend(ncol=2, loc='upper left')
    loc_ticks(ax, lang)
    save(fig, 'fig15_def_conc', lang)


def fig_tradeoff(lang):
    fig, ax = plt.subplots(figsize=(W1, H1))
    for k, (sym, rows) in enumerate(R['sweeps'].items()):
        x = [r['kerma_rel'] for r in rows]
        y = [r['DEF1'] for r in rows]
        ax.plot(x, y, color=C[k % len(C)], label=sym, lw=1.8 if sym == 'Al' else 1.2)
    ax.set_xscale('log')
    ax.set_xlim(1e-4, 1.1)
    ax.invert_xaxis()
    ax.set_xlabel(t('kerma_rel', lang))
    ax.set_ylabel(t('DEF', lang) + ' (1 % Ag)')
    ax.legend(ncol=2, loc='upper left')
    if lang != 'en':
        ax.yaxis.set_major_formatter(matplotlib.ticker.FuncFormatter(lambda x, p: ('%g' % x).replace('.', ',')))
    save(fig, 'fig16_tradeoff', lang)


def fig_scan(lang):
    sc = R['filter_scan']
    Z = [s['Z'] for s in sc]
    fig, ax = plt.subplots(figsize=(W1, H1))
    for k, (TK, key) in enumerate([(0.1, 'eq10'), (0.01, 'eq1'), (0.001, 'eq01')]):
        ax.plot(Z, [s[f'DEF1_{TK}'] for s in sc], 'o-', ms=3, color=C[k], label=t(key, lang))
    for s in sc:
        if s['sym'] in ('Al', 'Ti', 'Cu', 'Mo', 'Ag', 'Sn', 'Gd', 'W'):
            ax.annotate(s['sym'], (s['Z'], s['DEF1_0.001']), xytext=(0, 5), textcoords='offset points',
                        ha='center', fontsize=8)
    ax.set_xlabel(t('Z', lang))
    ax.set_ylabel(t('DEF', lang) + ' (1 % Ag)')
    ax.legend(loc='lower right')
    loc_ticks(ax, lang)
    save(fig, 'fig17_filter_scan', lang)


def fig_depth(lang):
    fig, ax = plt.subplots(figsize=(W1, H1))
    for k, d in enumerate(R['DEF_depth']):
        ax.plot(d['depth_mm'], d['DEF_1pct'], 'o-', ms=3, color=C[k], label=flab(d['label'], lang))
    ax.set_xlabel(t('depth', lang))
    ax.set_ylabel(t('DEF', lang) + ' (1 % Ag)')
    ax.legend(loc='lower right')
    loc_ticks(ax, lang)
    save(fig, 'fig18_def_depth', lang)


def fig_slab(lang):
    fig, ax = plt.subplots(figsize=(W1, H1))
    for k, s in enumerate(R['DEF_slab']):
        ax.plot(s['z_mm'], s['DEF'], color=C[[0.005, 0.01, 0.02].index(s['w'])],
                ls='-' if s['label'] == 'Al 1.0' else '--',
                label=f"{flab(s['label'], lang)}, Ag {num(s['w'] * 100, lang, 1)} %")
    ax.set_xlabel(t('depth', lang))
    ax.set_ylabel(t('DEF', lang))
    ax.legend(ncol=2, fontsize=8)
    loc_ticks(ax, lang)
    save(fig, 'fig19_def_slab', lang)


def fig_kvp(lang):
    kv = R['DEF_kvp']
    fig, ax = plt.subplots(figsize=(W1, H1))
    for k, lab in enumerate(['Al 0.5', 'Al 1.0']):
        x1 = [r['kvp'] for r in kv if 'model' not in r]
        y1 = [r[lab] for r in kv if 'model' not in r]
        x2 = [r['kvp'] for r in kv if 'model' in r]
        y2 = [r[lab] for r in kv if 'model' in r]
        ax.plot(x1, y1, 'o-', ms=3.5, color=C[k], label=f'{flab(lab, lang)} ({t("spekpy", lang)})')
        ax.plot([x1[-1]] + x2, [y1[-1]] + y2, 's--', ms=3.5, color=C[k], label=f'{flab(lab, lang)} ({t("model", lang)})')
    ax.axvline(AGK, color='0.35', ls='--', lw=0.9)
    ax.text(AGK + 0.7, 0.42, t('agK', lang), transform=ax.get_xaxis_transform(), fontsize=8.3, rotation=90)
    ax.set_xlabel(t('kv', lang))
    ax.set_ylabel(t('DEF', lang) + ' (1 % Ag)')
    ax.legend(loc='upper left', fontsize=8.3)
    loc_ticks(ax, lang)
    save(fig, 'fig20_def_kvp', lang)


def fig_elements(lang):
    els = ['Ag', 'I', 'Gd', 'Pt', 'Au', 'Bi']
    fig, ax = plt.subplots(figsize=(W1, H1))
    x = np.arange(len(els))
    for k, row in enumerate(R['elements']):
        vals = [row[e] for e in els]
        b = ax.bar(x + (k - 1) * 0.27, vals, 0.26, color=C[k], label=flab(row['label'], lang))
        for xi, v in zip(x + (k - 1) * 0.27, vals):
            ax.text(xi, v + 0.02, num(v, lang, 2), ha='center', fontsize=6.8, rotation=90)
    ax.set_xticks(x)
    ax.set_xticklabels(els)
    ax.set_ylim(1, 2.6)
    ax.set_ylabel(t('DEF', lang) + ' (1 %)')
    ax.legend(loc='upper left')
    loc_ticks(ax, lang)
    save(fig, 'fig21_elements', lang)


def fig_mc(lang):
    fig, axs = plt.subplots(1, 2, figsize=(W1, 2.9))
    for ax, lab in zip(axs, ['none', 'Al 1.0']):
        m = MC[lab]
        z = np.array(m['z_mm'])
        ax.fill_between(z, np.array(m['DEF_MC']) - 2 * np.array(m['DEF_MC_unc']),
                        np.array(m['DEF_MC']) + 2 * np.array(m['DEF_MC_unc']), color=C[1], alpha=0.25, lw=0)
        ax.plot(z, m['DEF_MC'], color=C[1], lw=1.0, label=t('mc', lang))
        ax.plot(z, m['DEF_analytic'], color=C[0], ls='--', label=t('analytic', lang))
        ax.axvspan(*m['layer_mm'], color='0.85', zorder=0)
        ax.set_xlabel(t('depth', lang))
        ax.set_title(flab(lab, lang), fontsize=9.5)
        ax.set_xlim(0, 30)
        loc_ticks(ax, lang)
    axs[0].set_ylabel(t('DEF', lang))
    axs[0].legend(loc='upper right', fontsize=7.8)
    fig.tight_layout()
    save(fig, 'fig22_mc', lang)


def fig_sensitivity(lang):
    S = R['sensitivity']
    base = S['base']
    names = {
        'kVp ±1 kV': {'en': 'tube voltage ±1 kV', 'ru': 'напряжение ±1 кВ', 'uz': 'kuchlanish ±1 kV'},
        'anode angle ±3°': {'en': 'anode angle ±3°', 'ru': 'угол анода ±3°', 'uz': 'anod burchagi ±3°'},
        'Be window ±0.1 mm': {'en': 'Be window ±0.1 mm', 'ru': 'Be-окно ±0,1 мм', 'uz': 'Be oyna ±0,1 mm'},
        'Al filter ±5%': {'en': 'Al filter thickness ±5 %', 'ru': 'толщина Al-фильтра ±5 %', 'uz': 'Al filtr qalinligi ±5 %'},
        'mu_en/rho Ag ±2%': {'en': r'$\mu_{en}/\rho$ (Ag) ±2 %', 'ru': r'$\mu_{en}/\rho$ (Ag) ±2 %', 'uz': r'$\mu_{en}/\rho$ (Ag) ±2 %'},
        'mu_en/rho tissue ±1%': {'en': r'$\mu_{en}/\rho$ (tissue) ±1 %', 'ru': r'$\mu_{en}/\rho$ (ткань) ±1 %',
                                 'uz': r'$\mu_{en}/\rho$ (to‘qima) ±1 %'},
        'tissue composition (ICRU 4-component / water)': {'en': 'reference medium (4-comp. tissue / water)',
                                                          'ru': 'эталонная среда (4-комп. ткань / вода)',
                                                          'uz': 'tayanch muhit (4-komp. to‘qima / suv)'},
        'spectrum model (DM vs SpekPy)': {'en': 'spectrum model (this work vs SpekPy)',
                                          'ru': 'модель спектра (данная работа / SpekPy)',
                                          'uz': 'spektr modeli (ushbu ish / SpekPy)'},
        'DM electron-depth factor eta ±25%': {'en': r'depth factor $\eta$ ±25 %', 'ru': r'коэффициент глубины $\eta$ ±25 %',
                                              'uz': r'chuqurlik koeffitsiyenti $\eta$ ±25 %'},
    }
    items = sorted(S['items'], key=lambda x: x['delta'])
    fig, ax = plt.subplots(figsize=(W1, 3.4))
    for i, it in enumerate(items):
        ref = it.get('ref', base)
        lo, hi = it['low'] - ref, it['high'] - ref
        ax.barh(i, lo, color=C[0], height=0.55, label=t('lowvar', lang) if i == 0 else None)
        ax.barh(i, hi, color=C[1], height=0.55, label=t('highvar', lang) if i == 0 else None)
    ax.legend(loc='lower right', fontsize=8)
    ax.set_yticks(range(len(items)))
    ax.set_yticklabels([names[it['name']][lang] for it in items], fontsize=8.5)
    ax.axvline(0, color='k', lw=0.7)
    ax.set_xlabel(t('delta_def', lang) + f" (DEF = {num(base, lang, 3)})")
    loc_ticks(ax, lang)
    save(fig, 'fig23_sensitivity', lang)


if __name__ == '__main__':
    for lang in ['en', 'ru', 'uz']:
        for f in [fig_tube, fig_coeffs, fig_ratio, fig_electron, fig_validation, fig_validation_w, fig_baseline,
                  fig_studies, fig_integrand, fig_def_conc, fig_tradeoff, fig_scan, fig_depth, fig_slab, fig_kvp,
                  fig_elements, fig_mc, fig_sensitivity]:
            f(lang)
    print('figures done')
