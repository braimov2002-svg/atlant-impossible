"""Query Crossref for each candidate reference and store the best matches."""
import json, os, sys, time, difflib, urllib.parse, urllib.request
from refs_candidates import CANDIDATES

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'data', 'crossref_hits.json')
UA = 'dissertation-ref-check/1.0 (mailto:braimov2002@gmail.com)'


def query(q, rows=3):
    url = 'https://api.crossref.org/works?' + urllib.parse.urlencode({
        'query.bibliographic': q, 'rows': rows,
        'select': 'DOI,title,author,container-title,short-container-title,volume,issue,page,article-number,issued,type,publisher'})
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                return json.load(r)['message']['items']
        except Exception as e:  # network hiccup
            time.sleep(2 ** attempt)
    return []


def fmt(it):
    au = it.get('author', [])
    names = [f"{a.get('family', '')} {''.join(x[0] for x in a.get('given', '').replace('-', ' ').split() if x)}".strip()
             for a in au]
    yr = (it.get('issued', {}).get('date-parts') or [[None]])[0][0]
    return dict(DOI=it.get('DOI'), title=(it.get('title') or [''])[0], authors=names, n_authors=len(names),
                journal=(it.get('container-title') or [''])[0], journal_abbr=(it.get('short-container-title') or [''])[0],
                year=yr, volume=it.get('volume'), issue=it.get('issue'),
                pages=it.get('page') or it.get('article-number'), type=it.get('type'), publisher=it.get('publisher'))


res = {}
if os.path.exists(OUT):
    res = json.load(open(OUT))
for key, q, yr in CANDIDATES:
    if key in res and '--force' not in sys.argv:
        continue
    items = query(q, rows=5 if yr is None else 3)
    hits = [fmt(i) for i in items]
    for h in hits:
        h['sim'] = round(difflib.SequenceMatcher(None, q.lower(), (h['title'] or '').lower()).ratio(), 2)
    res[key] = dict(query=q, year=yr, hits=hits)
    json.dump(res, open(OUT, 'w'), indent=1, ensure_ascii=False)
    time.sleep(0.3)
for key, v in res.items():
    h = v['hits'][0] if v['hits'] else {}
    flag = '' if (h and (v['year'] is None or h.get('year') == v['year'])) else '  <-- YEAR?'
    print(f"{key:22s} {h.get('year')} {h.get('journal_abbr') or h.get('journal')} {h.get('volume')}:{h.get('pages')} | {h.get('title', '')[:90]}{flag}")
