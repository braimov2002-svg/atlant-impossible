"""Build data/refs.json: verified bibliographic records (Crossref metadata by DOI,
plus a few books, reports, standards and databases entered by hand) and their
GOST 7.1-style strings."""
import html, json, os, re, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'data', 'refs.json')
UA = {'User-Agent': 'dissertation-ref-check/1.0 (mailto:braimov2002@gmail.com)'}

DOI = {
    'hainfeld2004': '10.1088/0031-9155/49/18/n03', 'cho2005': '10.1088/0031-9155/50/15/n01',
    'mcmahon2011': '10.1038/srep00018', 'butterworth2012': '10.1039/c2nr31227a', 'kuncic2018': '10.1088/1361-6560/aa99ce',
    'retif2015': '10.7150/thno.11642', 'her2017': '10.1016/j.addr.2015.12.012', 'schuemann2016': '10.1016/j.ijrobp.2015.09.032',
    'lechtman2011': '10.1088/0031-9155/56/15/001', 'rahman2009': '10.1016/j.nano.2009.01.014',
    'robar2002': '10.1088/0031-9155/47/14/305', 'matsudaira1980': '10.2307/3575225', 'mello1983': '10.1118/1.595378',
    'adam2003': '10.1016/j.ijrobp.2003.07.007', 'biston2004': '10.1158/0008-5472.can-03-3600', 'corde2004': '10.1038/sj.bjc.6601951',
    'bray2024': '10.3322/caac.21834', 'delaney2005': '10.1002/cncr.21324', 'baskar2012': '10.7150/ijms.3635',
    'wardman2007': '10.1016/j.clon.2007.03.010', 'gill2019': '10.1039/c8cs00641e', 'liu2013': '10.1039/c3nr01351k',
    'xu2009': '10.1038/cr.2009.89', 'liu2018': '10.1080/21691401.2018.1518912', 'zhao2019': '10.2147/ijn.s224160',
    'lu2012': '10.2147/ijn.s29762', 'habiba2019': '10.1038/s41598-019-53706-0', 'asharani2009': '10.1021/nn800596w',
    'wei2015': '10.1016/j.drudis.2014.11.014', 'burdusel2018': '10.3390/nano8090681', 'swanner2015': '10.2147/ijn.s80349',
    'song2017': '10.1002/adma.201700996', 'liu2016': '10.2147/IJN.S115473', 'taha2019': '10.1016/j.radphyschem.2018.10.027',
    'caglar2024': '10.1177/15330338241235771', 'merkis2023': '10.1016/j.radphyschem.2023.111213', 'chow2023': '10.3390/mi14061230',
    'esitmez2026': '10.28979/jarnas.1862846', 'mcmahon2016': '10.1039/c5nr07089a',
    'zhang2009': '10.1007/s10544-009-9309-5', 'jones2010': '10.1118/1.3455703', 'leung2011': '10.1118/1.3539623',
    'roeske2007': '10.1177/153303460700600504', 'ma2001': '10.1118/1.1374247', 'hill2014': '10.1088/0031-9155/59/6/R183',
    'grosswendt1990': '10.1088/0031-9155/35/9/004', 'kramers1923': '10.1080/14786442308565244',
    'birch1979': '10.1088/0031-9155/24/3/002', 'tucker1991': '10.1118/1.596709', 'boone1997': '10.1118/1.597953',
    'poludniowski2007a': '10.1118/1.2734725', 'poludniowski2007b': '10.1118/1.2734726',
    'poludniowski2009': '10.1088/0031-9155/54/19/n01', 'poludniowski2021': '10.1002/mp.14945',
    'bujila2020': '10.1016/j.ejmp.2020.04.026', 'omar2018': '10.1016/j.nimb.2018.10.026', 'omar2020a': '10.1002/mp.14359',
    'omar2020b': '10.1002/mp.14360', 'punnoose2016': '10.1118/1.4955438', 'ay2004': '10.1088/0031-9155/49/21/004',
    'verhaegen1999': '10.1088/0031-9155/44/7/315', 'kawrakow2000': '10.1118/1.598917',
    'agostinelli2003': '10.1016/S0168-9002(03)01368-8', 'seltzer1986': '10.1016/0092-640x(86)90014-8',
    'koch1959': '10.1103/revmodphys.31.920', 'elwert1939': '10.1002/andp.19394260206', 'bethe1934': '10.1098/rspa.1934.0140',
    'gryzinski1965': '10.1103/physrev.138.a336', 'llovet2014': '10.1063/1.4832851', 'bote2008': '10.1103/physreva.77.042701',
    'green1961': '10.1088/0370-1328/78/6/315', 'whiddington1912': '10.1098/rspa.1912.0028', 'bethe1930': '10.1002/andp.19303970303',
    'schoonjans2011': '10.1016/j.sab.2011.09.011', 'krause1979': '10.1063/1.555594', 'bambynek1972': '10.1103/revmodphys.44.716',
    'deslattes2003': '10.1103/RevModPhys.75.35', 'hubbell1975': '10.1063/1.555523', 'seltzer1993': '10.2307/3578607',
    'harris2020': '10.1038/s41586-020-2649-2', 'virtanen2020': '10.1038/s41592-019-0686-2', 'hunter2007': '10.1109/mcse.2007.55',
    'rosa2017': '10.1186/s12645-017-0026-0', 'penninckx2020': '10.3390/cancers12082021', 'chithrani2010': '10.1667/rr1984.1',
    'brun2009': '10.1016/j.colsurfb.2009.03.025', 'rahman2014': '10.2147/ijn.s59471', 'spiers1949': '10.1259/0007-1285-22-261-521',
    'das1995': '10.1118/1.597594', 'mesbahi2010': '10.1016/j.rpor.2010.09.001', 'jain2012': '10.1259/bjr/59448833',
    'koger2016': '10.1088/1361-6560/61/24/8839', 'fano1954': '10.2307/3570368', 'pignol2003': '10.1016/s0360-3016(02)04508-x',
    'verhaegen2005': '10.1088/0031-9155/50/15/005', 'solberg1992': '10.1088/0031-9155/37/2/010', 'rose1999': '10.1016/s0360-3016(99)00347-8',
    'haume2016': '10.1186/s12645-016-0021-x', 'kakade2015': '10.4103/0973-1482.147691', 'khoshgard2014': '10.1088/0031-9155/59/9/2249',
    'icru85': '10.1093/jicru/ndr011', 'podgorsak2016': '10.1007/978-3-319-25382-4',
}

MANUAL = {
    'attix1986': 'Attix F.H. Introduction to Radiological Physics and Radiation Dosimetry. – New York: Wiley, 1986. – 607 p.',
    'hall2018': 'Hall E.J., Giaccia A.J. Radiobiology for the Radiologist. – 8th ed. – Philadelphia: Wolters Kluwer, 2018. – 624 p.',
    'khan2014': 'Khan F.M., Gibbons J.P. Khan’s The Physics of Radiation Therapy. – 5th ed. – Philadelphia: Lippincott Williams & Wilkins, 2014. – 572 p.',
    'andreo2017': 'Andreo P., Burns D.T., Nahum A.E., Seuntjens J., Attix F.H. Fundamentals of Ionizing Radiation Dosimetry. – Weinheim: Wiley-VCH, 2017. – 1000 p.',
    'cullity2001': 'Cullity B.D., Stock S.R. Elements of X-Ray Diffraction. – 3rd ed. – Upper Saddle River: Prentice Hall, 2001. – 664 p.',
    'bushberg2012': 'Bushberg J.T., Seibert J.A., Leidholdt E.M., Boone J.M. The Essential Physics of Medical Imaging. – 3rd ed. – Philadelphia: Lippincott Williams & Wilkins, 2012. – 1030 p.',
    'icru37': 'ICRU Report 37. Stopping Powers for Electrons and Positrons. – Bethesda, MD: International Commission on Radiation Units and Measurements, 1984.',
    'icru44': 'ICRU Report 44. Tissue Substitutes in Radiation Dosimetry and Measurement. – Bethesda, MD: International Commission on Radiation Units and Measurements, 1989.',
    'nist_xcom': 'Berger M.J., Hubbell J.H., Seltzer S.M., Chang J., Coursey J.S., Sukumar R., Zucker D.S., Olsen K. XCOM: Photon Cross Sections Database. NIST Standard Reference Database 8 (XGAM). – Gaithersburg, MD: National Institute of Standards and Technology, 2010. – DOI: 10.18434/T48G6X.',
    'nist_xraymass': 'Hubbell J.H., Seltzer S.M. Tables of X-Ray Mass Attenuation Coefficients and Mass Energy-Absorption Coefficients (version 1.4). NIST Standard Reference Database 126 (NISTIR 5632). – Gaithersburg, MD: National Institute of Standards and Technology, 2004. – DOI: 10.18434/T4D01F.',
    'nist_estar': 'Berger M.J., Coursey J.S., Zucker M.A., Chang J. ESTAR, PSTAR, and ASTAR: Computer Programs for Calculating Stopping-Power and Range Tables for Electrons, Protons, and Helium Ions. NIST Standard Reference Database 124. – Gaithersburg, MD: National Institute of Standards and Technology, 2017. – DOI: 10.18434/T4NC7P.',
    'iaea_trs398': 'IAEA Technical Reports Series No. 398. Absorbed Dose Determination in External Beam Radiotherapy: An International Code of Practice for Dosimetry Based on Standards of Absorbed Dose to Water. – Vienna: International Atomic Energy Agency, 2000.',
    'iec61267': 'IEC 61267:2005. Medical diagnostic X-ray equipment – Radiation conditions for use in the determination of characteristics. – Geneva: International Electrotechnical Commission, 2005.',
    'icrp103': 'ICRP Publication 103. The 2007 Recommendations of the International Commission on Radiological Protection // Annals of the ICRP. – 2007. – Vol. 37, No. 2–4. – P. 1–332.',
    'iaea_gsr3': 'IAEA Safety Standards Series No. GSR Part 3. Radiation Protection and Safety of Radiation Sources: International Basic Safety Standards. – Vienna: International Atomic Energy Agency, 2014. – 436 p.',
    'uz_law_radsafety': 'O‘zbekiston Respublikasining “Radiatsiyaviy xavfsizlik to‘g‘risida”gi Qonuni, 2000-yil 31-avgust, № 120-II [Law of the Republic of Uzbekistan “On Radiation Safety”, 31 August 2000, No. 120-II].',
    'salvat2019': 'Salvat F. PENELOPE-2018: A Code System for Monte Carlo Simulation of Electron and Photon Transport. – Paris: OECD Nuclear Energy Agency, 2019. – 420 p.',
    'woodcock1965': 'Woodcock E., Murphy T., Hemmings P., Longworth S. Techniques used in the GEM code for Monte Carlo neutronics calculations in reactors and other systems of complex geometry // Proceedings of the Conference on the Application of Computing Methods to Reactor Problems. ANL-7050. – Argonne: Argonne National Laboratory, 1965. – P. 557–579.',
    'kalos2008': 'Kalos M.H., Whitlock P.A. Monte Carlo Methods. – 2nd ed. – Weinheim: Wiley-VCH, 2008. – 215 p.',
    'spekpy_soft': 'SpekPy: a software toolkit for modelling the x-ray spectra from x-ray tubes, version 2.5.4 [Electronic resource]. – URL: https://bitbucket.org/spekpy/spekpy_release (accessed 27.10.2026).',
}


def initials(given):
    parts = re.split(r'[\s]+', given.replace('.', ' ').strip())
    out = []
    for p in parts:
        if not p:
            continue
        sub = p.split('-')
        out.append('-'.join(s[0].upper() + '.' for s in sub if s))
    return ''.join(out)


def clean(s):
    s = html.unescape(re.sub(r'<[^>]+>', '', s or ''))
    return re.sub(r'\s+', ' ', s).strip()


def fetch(doi):
    for a in range(4):
        try:
            return json.load(urllib.request.urlopen(urllib.request.Request('https://api.crossref.org/works/' + doi, headers=UA), timeout=40))['message']
        except Exception:
            time.sleep(2 ** a)
    raise RuntimeError(doi)


def gost(m, doi):
    au = m.get('author', [])
    names = []
    for a in au:
        fam = a.get('family') or a.get('name', '')
        fam = fam.title() if fam.isupper() else fam
        names.append(f"{fam} {initials(a.get('given', ''))}".strip())
    title = clean((m.get('title') or [''])[0])
    title = title.replace('Theorectical', 'Theorectical')   # sic, as published
    jr = clean((m.get('container-title') or [''])[0])
    yr = m.get('issued', {}).get('date-parts', [[None]])[0][0]
    if doi.lower() == '10.1021/nn800596w':
        yr = 2009                              # journal volume year (online 2008)
    vol, iss = m.get('volume'), m.get('issue')
    pg = m.get('page') or m.get('article-number')
    if m.get('type') == 'book' or m.get('type') == 'monograph':
        a = ', '.join(names)
        return f"{a} {title}. – Cham: Springer, {yr}. – DOI: {doi}."
    if len(names) > 4:
        a = ', '.join(names[:3]) + ' [et al.]'
    else:
        a = ', '.join(names)
    s = f"{a} {title} // {jr}. – {yr}."
    if vol:
        s += f" – Vol. {str(vol).replace('Volume ', '')}"
        s += f", No. {iss}." if iss else '.'
    if pg:
        pg = str(pg).replace('-', '–')
        s += f" – P. {pg}." if ('–' in pg or not pg.isdigit() or len(pg) < 6) else f" – Art. {pg}."
    s += f" – DOI: {doi}."
    return s


refs = json.load(open(OUT)) if os.path.exists(OUT) else {}
for k, d in DOI.items():
    if k in refs and refs[k].get('doi') == d:
        continue
    m = fetch(d)
    refs[k] = dict(doi=d, text=gost(m, d), year=m.get('issued', {}).get('date-parts', [[None]])[0][0],
                   title=clean((m.get('title') or [''])[0]),
                   first_author=(m.get('author') or [{}])[0].get('family', ''))
    time.sleep(0.25)
for k, s in MANUAL.items():
    refs[k] = dict(doi=None, text=s, manual=True)
json.dump(refs, open(OUT, 'w'), indent=1, ensure_ascii=False)
print(len(refs), 'references')
for k in list(refs)[:200]:
    print(k, '|', refs[k]['text'])
