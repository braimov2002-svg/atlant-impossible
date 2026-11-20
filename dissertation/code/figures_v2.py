"""
figures_v2.py - figures of the edited English version (v2): schematics redrawn
with English labels, NIST-based cross-section and attenuation plots, and the
author's chapter-3 images combined into (a)/(b) panels.
Usage: python3 figures_v2.py <dir with the author's images> [en|uz]
(the Uzbek set reuses the English raster images and relabels the two author's plots that contain words)
"""
import os, shutil, sys
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, FancyArrow, FancyBboxPatch, Circle, Arc
from PIL import Image
import xraylib as xr
import nist

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', 'data')
SRC = sys.argv[1] if len(sys.argv) > 1 else '.'
LANG = sys.argv[2] if len(sys.argv) > 2 else 'en'
OUT = os.path.join(HERE, '..', 'v2', 'figures', LANG)
EN_OUT = os.path.join(HERE, '..', 'v2', 'figures', 'en')
UZ = {
    'total': 'to‘liq kesim', 'photoelectric effect': 'fotoeffekt',
    'Compton (incoherent) scattering': 'kompton (nokogerent) sochilishi',
    'coherent (Rayleigh) scattering': 'kogerent (Reley) sochilishi',
    'electron–positron pair production': 'elektron–pozitron jufti hosil bo‘lishi',
    'Ag K-edge\n25.51 keV': 'Ag K-chegarasi\n25,51 keV', 'pair threshold\n1.022 MeV': 'juft hosil bo‘lish\nbo‘sag‘asi 1,022 MeV',
    'Photon energy, MeV': 'Foton energiyasi, MeV', 'Photon energy, keV': 'Foton energiyasi, keV',
    'Cross-section per atom, cm$^2$': 'Bir atomga to‘g‘ri keladigan kesim, sm$^2$',
    'water': 'suv', 'soft tissue (ICRU-44)': 'yumshoq to‘qima (ICRU-44)', 'brain (ICRU-44)': 'miya (ICRU-44)',
    'cortical bone (ICRU-44)': 'kortikal suyak (ICRU-44)', 'silver (Ag)': 'kumush (Ag)',
    r'Mass attenuation coefficient $\mu/\rho$, cm$^2$ g$^{-1}$': r'Massaviy susayish koeffitsiyenti $\mu/\rho$, sm$^2$ g$^{-1}$',
    'X-ray emitter\n(REIS-I, BS1 tube)': 'Rentgen nurlatkichi\n(REIS-I, BS1 trubka)', 'output\nwindow': 'chiqish\noynasi',
    'vial with\nsample': 'namunali\nflakon', 'dosimeter detector head\n(DRG3-02)': 'dozimetr detektori\nboshchasi (DRG3-02)',
    'lead shielding plates': 'qo‘rg‘oshin himoya plitalari', 'radiation\nshielding\nchamber': 'radiatsiyaviy\nhimoya\nkamerasi',
    'electron beam': 'elektronlar dastasi', 'anode (target)': 'anod (nishon)', 'output window': 'chiqish oynasi',
    'x-ray photons': 'rentgen fotonlari', 'maximum photon energy of the 45 kVp tube': '45 kVp trubkaning maksimal foton energiyasi',
    'Atomic number $Z$': 'Atom raqami $Z$', 'K-shell binding energy $E_K$, keV': 'K-qobiqning bog‘lanish energiyasi $E_K$, keV',
}


def t(s):
    return UZ.get(s, s) if LANG == 'uz' else s


def dec(x):
    return x.replace('.', ',') if LANG == 'uz' else x

plt.rcParams.update({
    'font.family': 'Liberation Serif', 'mathtext.fontset': 'stix', 'font.size': 10.5,
    'axes.labelsize': 10.5, 'legend.fontsize': 9, 'xtick.labelsize': 9.5, 'ytick.labelsize': 9.5,
    'axes.linewidth': 0.8, 'lines.linewidth': 1.4, 'savefig.dpi': 300,
    'axes.grid': True, 'grid.alpha': 0.25, 'grid.linewidth': 0.5, 'legend.frameon': False,
})
C = ['#1f4e79', '#c0392b', '#2e8b57', '#d68910', '#6c3483', '#17a589', '#7f8c8d']


def save(fig, name):
    fig.savefig(os.path.join(OUT, name + '.png'), bbox_inches='tight', pad_inches=0.04)
    plt.close(fig)


# ------------------------------------------------------------ Fig. 2.x: Ag cross-sections (NIST XCOM)
def fig_xsec_ag():
    a = np.loadtxt(os.path.join(DATA, 'xcom_ag.csv'), delimiter=',', skiprows=1)
    E = a[:, 0]
    k = 107.8682 / 6.02214076e23          # cm2/g -> cm2 per atom
    m = (E >= 1e-3) & (E <= 100)
    fig, ax = plt.subplots(figsize=(6.3, 3.9))
    ax.loglog(E[m], a[m, 6] * k, color='k', lw=1.7, label=t('total'))
    ax.loglog(E[m], a[m, 3] * k, color=C[1], label=t('photoelectric effect'))
    ax.loglog(E[m], a[m, 2] * k, color=C[0], ls='--', label=t('Compton (incoherent) scattering'))
    ax.loglog(E[m], a[m, 1] * k, color=C[2], ls=':', label=t('coherent (Rayleigh) scattering'))
    pr = (a[:, 4] + a[:, 5]) * k
    mp = m & (pr > 0)
    ax.loglog(E[mp], pr[mp], color=C[3], ls='-.', label=t('electron–positron pair production'))
    ax.axvline(25.514e-3, color='0.4', ls='--', lw=0.8)
    ax.text(27e-3, 2e-27, t('Ag K-edge\n25.51 keV'), fontsize=8.3, color='0.3')
    ax.axvline(1.022, color='0.4', ls=':', lw=0.8)
    ax.text(1.1, 2e-27, t('pair threshold\n1.022 MeV'), fontsize=8.3, color='0.3')
    ax.set_xlim(1e-3, 100)
    ax.set_ylim(1e-27, 1e-17)
    ax.set_xlabel(t('Photon energy, MeV'))
    ax.set_ylabel(t('Cross-section per atom, cm$^2$'))
    ax.legend(loc='upper right', fontsize=8.4)
    save(fig, 'f2_xsec_ag')


# ------------------------------------------------------------ Fig. 2.x: mu/rho of media (NIST)
def fig_media_mu():
    E = np.logspace(0, 2, 600)
    fig, ax = plt.subplots(figsize=(6.3, 3.9))
    for mat, lab, c, ls in [('water', 'water', C[4], ':'), ('tissue', 'soft tissue (ICRU-44)', C[0], '-'),
                            ('brain', 'brain (ICRU-44)', C[2], '--'), ('bone', 'cortical bone (ICRU-44)', C[3], '-'),
                            (47, 'silver (Ag)', C[1], '-')]:
        ax.loglog(E, nist.coeff(mat, E, 'mu'), color=c, ls=ls, label=t(lab))
    ax.set_xlim(1, 100)
    ax.set_xlabel(t('Photon energy, keV'))
    ax.set_ylabel(t(r'Mass attenuation coefficient $\mu/\rho$, cm$^2$ g$^{-1}$'))
    ax.legend(loc='lower left')
    save(fig, 'f2_media_mu')


# ------------------------------------------------------------ Fig. 2.x: REIS-I set-up schematic
def fig_facility_scheme():
    fig, ax = plt.subplots(figsize=(6.3, 2.6))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 40)
    ax.axis('off')
    # shielding chamber (rounded rear wall) and lead plates
    ax.add_patch(FancyBboxPatch((3, 7), 88, 26, boxstyle='round,pad=0,rounding_size=6', fill=False, lw=1.2))
    for y in (31.5, 6.5):
        ax.add_patch(Rectangle((14, y), 62, 2.2, facecolor='0.55', edgecolor='k', lw=0.8))
    # X-ray emitter, output window, vial, dosimeter head
    ax.add_patch(Rectangle((6, 13), 24, 14, facecolor='#d6e4f0', edgecolor='k', lw=1))
    ax.text(18, 20, t('X-ray emitter\n(REIS-I, BS1 tube)'), ha='center', va='center', fontsize=8.6)
    ax.add_patch(Rectangle((30, 16.5), 7, 7, facecolor='0.85', edgecolor='k', lw=1))
    ax.text(33.5, 13.5, t('output\nwindow'), ha='center', va='top', fontsize=7.6)
    ax.add_patch(Circle((40.5, 20), 3.2, facecolor='#f5cba7', edgecolor='k', lw=1))
    ax.text(40.5, 26.5, t('vial with\nsample'), ha='center', va='bottom', fontsize=7.6)
    ax.add_patch(Rectangle((44, 15.5), 26, 9, facecolor='#e8f6e8', edgecolor='k', lw=1))
    ax.text(57, 20, t('dosimeter detector head\n(DRG3-02)'), ha='center', va='center', fontsize=8.2)
    ax.annotate('', xy=(43.7, 20), xytext=(37.2, 20), arrowprops=dict(arrowstyle='->', color=C[1], lw=1.2))
    ax.text(60, 35.5, t('lead shielding plates'), ha='center', fontsize=8)
    ax.text(84, 20, t('radiation\nshielding\nchamber'), ha='center', va='center', fontsize=8)
    save(fig, 'f2_facility_scheme')


def fig_facility_photos():
    combine([os.path.join(SRC, 'image7.jpeg'), os.path.join(SRC, 'image8.jpeg')], 'f2_facility_photos', height=620)


# ------------------------------------------------------------ Fig. 3.x: x-ray generation in a transmission anode
def fig_mechanism():
    fig, ax = plt.subplots(figsize=(6.3, 2.9))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 44)
    ax.axis('off')
    for y in (35, 8):                                   # tube walls
        ax.add_patch(Rectangle((2, y), 52, 1.8, facecolor='0.45', edgecolor='none'))
    ax.add_patch(Rectangle((40, 9.8), 11, 25.2, facecolor='0.85', edgecolor='0.4', lw=0.8))      # anode
    ax.add_patch(Rectangle((51, 8), 3, 28.8, facecolor='0.3', edgecolor='none'))                # output window
    ax.add_patch(FancyArrow(4, 22, 39, 0, width=6, head_width=11, head_length=6, color='0.1'))
    ax.add_patch(FancyArrow(47, 22, 40, 0, width=6, head_width=11, head_length=6, color='0.55'))
    ax.text(18, 40, t('electron beam'), ha='center', fontsize=9)
    ax.text(45.5, 40, t('anode (target)'), ha='center', fontsize=9)
    ax.text(62, 40, t('output window'), ha='center', fontsize=9)
    ax.text(84, 31, t('x-ray photons'), ha='center', fontsize=9)
    # dimensions x1, x2, x3
    y0 = 3.2
    for x in (40, 47, 51, 54):
        ax.plot([x, x], [y0 - 1.2, 8], color='k', lw=0.6)
    for xa, xb, lab in [(40, 47, '$x_1$'), (47, 51, '$x_2$'), (51, 54, '$x_3$')]:
        ax.annotate('', xy=(xa, y0), xytext=(xb, y0), arrowprops=dict(arrowstyle='<->', lw=0.7))
        ax.text((xa + xb) / 2, y0 + 0.9, lab, ha='center', va='bottom', fontsize=9.5)
    save(fig, 'f3_mechanism')


# ------------------------------------------------------------ Fig. 3.x: anode designs
def fig_anodes():
    fig, axs = plt.subplots(1, 2, figsize=(6.3, 3.0))
    for ax in axs:
        ax.set_xlim(0, 50)
        ax.set_ylim(0, 50)
        ax.axis('off')
        ax.set_aspect('equal')
    a, b = axs
    # (a) massive anode: target 3 on anode body 4, photons 2 taken off on the electron side
    a.add_patch(Rectangle((12, 4), 24, 22, facecolor='white', edgecolor='k', hatch='///', lw=0.9))
    a.add_patch(Rectangle((12, 26), 24, 3, facecolor='0.7', edgecolor='k', hatch='xxx', lw=0.9))
    a.annotate('', xy=(24, 29), xytext=(24, 47), arrowprops=dict(arrowstyle='->', lw=1.1))
    for dx in (-1, 1):
        a.annotate('', xy=(24 + dx * 16, 39), xytext=(24, 29.2), arrowprops=dict(arrowstyle='->', lw=1.0, ls='--'))
    a.add_patch(Arc((24, 29), 18, 18, theta1=30, theta2=90, lw=0.8))
    a.text(30.5, 39.5, r'$\varphi$', fontsize=10)
    for x, y, t in [(25.5, 45, '1'), (8, 39, '2'), (41, 39, '2'), (37.5, 27, '3'), (37.5, 15, '4')]:
        a.text(x, y, t, fontsize=10)
    a.text(2, 46, 'a)', fontsize=11, style='italic')
    # (b) transmission anode: thin target 3 on substrate 4, photons 2 transmitted forward
    b.add_patch(Rectangle((6, 26), 38, 2.4, facecolor='0.7', edgecolor='k', hatch='xxx', lw=0.9))
    b.add_patch(Rectangle((6, 23.6), 38, 2.4, facecolor='white', edgecolor='k', hatch='///', lw=0.9))
    b.annotate('', xy=(22, 28.4), xytext=(22, 47), arrowprops=dict(arrowstyle='->', lw=1.1))
    for dx in (-7, 7):
        b.annotate('', xy=(22 + dx, 4), xytext=(22, 23.4), arrowprops=dict(arrowstyle='->', lw=1.0, ls='--'))
    b.add_patch(Arc((22, 26), 26, 26, theta1=-75, theta2=90, lw=0.8))
    b.text(36.5, 33, r'$\varphi$', fontsize=10)
    for x, y, t in [(23.5, 45, '1'), (12, 3, '2'), (30, 3, '2'), (45, 27.3, '3'), (45, 21.5, '4')]:
        b.text(x, y, t, fontsize=10)
    b.text(2, 46, 'b)', fontsize=11, style='italic')
    save(fig, 'f3_anodes')


# ------------------------------------------------------------ Fig. 3.x: K-shell binding energies Z = 30-65
def fig_ek():
    Z = np.arange(30, 66)
    EK = np.array([xr.EdgeEnergy(int(z), xr.K_SHELL) for z in Z])
    fig, ax = plt.subplots(figsize=(5.6, 3.6))
    ax.plot(Z, EK, 'o-', color=C[1], ms=3.5, lw=1)
    for z, lab in [(47, 'Ag'), (62, 'Sm')]:
        e = xr.EdgeEnergy(z, xr.K_SHELL)
        ax.plot([z], [e], 'o', ms=7, mfc='none', mec='k')
        ax.annotate(f'{lab}: ' + dec(f'{e:.2f}') + ' keV', xy=(z, e), xytext=(z - 15, e + 5), fontsize=9,
                    arrowprops=dict(arrowstyle='->', lw=0.7))
    ax.axhline(45, color='0.4', ls='--', lw=0.8)
    ax.text(31, 46, t('maximum photon energy of the 45 kVp tube'), fontsize=8.5, color='0.3')
    ax.set_xlim(30, 65)
    ax.set_ylim(5, 55)
    ax.set_xlabel(t('Atomic number $Z$'))
    ax.set_ylabel(t('K-shell binding energy $E_K$, keV'))
    save(fig, 'f3_ek')


# ------------------------------------------------------------ helpers for the author's images
def combine(paths, name, height=520, labels=('(a)', '(b)')):
    ims = [Image.open(p).convert('RGB') for p in paths]
    ims = [im.resize((int(im.width * height / im.height), height), Image.LANCZOS) for im in ims]
    gap, lab_h = 30, 48
    W = sum(im.width for im in ims) + gap * (len(ims) - 1)
    canvas = Image.new('RGB', (W, height + lab_h), 'white')
    x = 0
    fig_lab = []
    for im in ims:
        canvas.paste(im, (x, 0))
        fig_lab.append(x + im.width / 2)
        x += im.width + gap
    fig = plt.figure(figsize=(W / 100, (height + lab_h) / 100), dpi=100)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.imshow(canvas)
    ax.axis('off')
    for cx, lab in zip(fig_lab, labels):
        ax.text(cx, height + lab_h * 0.62, lab, ha='center', va='center', fontsize=16, family='Liberation Serif')
    fig.savefig(os.path.join(OUT, name + '.png'), dpi=200)
    plt.close(fig)


def upscale(src, name, factor=3):
    im = Image.open(src).convert('RGB')
    im.resize((im.width * factor, im.height * factor), Image.LANCZOS).save(os.path.join(OUT, name + '.png'))


def relabel_uz():
    """Uzbek labels on the two author's plots that contain English words (spectra and DEF)."""
    from PIL import ImageDraw, ImageFont
    bold = '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'
    white = (255, 255, 255)
    im = Image.open(os.path.join(EN_OUT, 'f3_spectra.png')).convert('RGB')
    d = ImageDraw.Draw(im)
    d.rectangle([1018, 57, 1270, 91], fill=white)
    d.rectangle([1018, 158, 1250, 199], fill=white)
    fb = ImageFont.truetype(bold, 37)
    for y, txt in ((52, 'filtrsiz'), (154, '30 mkm Al')):
        x = 1027
        for ch in txt:                       # letter-spaced like the original legend
            d.text((x, y), ch, font=fb, fill=(0, 0, 0))
            x += fb.getlength(ch) + 3
    d.rectangle([56, 228, 108, 632], fill=white)
    f2 = ImageFont.truetype(bold, 44)
    new = 'N, foton/(s sr keV)'
    lab = Image.new('RGB', (int(f2.getlength(new)) + 6, 56), white)
    ImageDraw.Draw(lab).text((3, 2), new, font=f2, fill=(0, 0, 0))
    lab = lab.rotate(90, expand=True)
    im.paste(lab, (82 - lab.width // 2 + 3, 429 - lab.height // 2))
    im.save(os.path.join(OUT, 'f3_spectra.png'))
    im = Image.open(os.path.join(EN_OUT, 'f3_def.png')).convert('RGB')
    d = ImageDraw.Draw(im)
    f = ImageFont.truetype(bold, 42)
    for y0, y1, txt in ((25, 61, 'Al filtr (30 mkm)'), (77, 114, 'Al filtr (2,11 mm)'),
                        (132, 168, 'Al filtr (30 mkm)'), (186, 221, 'Al filtr (2,11 mm)')):
        d.rectangle([432, y0 - 3, 800, y1 + 3], fill=white)
        bb = d.textbbox((0, 0), '(', font=f)
        d.text((440, (y0 + y1) / 2 - (bb[1] + bb[3]) / 2), txt, font=f, fill=(0, 0, 0))
    im.save(os.path.join(OUT, 'f3_def.png'))


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    fig_xsec_ag()
    fig_media_mu()
    fig_facility_scheme()
    fig_mechanism()
    fig_anodes()
    fig_ek()
    if LANG == 'en':
        fig_facility_photos()
        upscale(os.path.join(SRC, 'image14.png'), 'f3_spectra')
        combine([os.path.join(SRC, 'image16.jpeg'), os.path.join(SRC, 'image17.jpeg')], 'f3_discont')
        combine([os.path.join(SRC, 'image18.jpeg'), os.path.join(SRC, 'image19.jpeg')], 'f3_ratio_agsm')
        upscale(os.path.join(SRC, 'image20.png'), 'f3_def')
    else:   # photos and symbol-only plots are language-neutral; two plots get Uzbek labels
        for f in ('f2_facility_photos', 'f3_discont', 'f3_ratio_agsm'):
            shutil.copy(os.path.join(EN_OUT, f + '.png'), os.path.join(OUT, f + '.png'))
        relabel_uz()
    for f in ('fig01_tube', 'fig02_coeffs', 'fig03_ratio', 'fig04_electron'):
        shutil.copy(os.path.join(HERE, '..', 'figures', LANG, f + '.png'), os.path.join(OUT, f + '.png'))
    print('v2 figures written to', OUT)
