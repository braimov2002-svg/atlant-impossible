#!/usr/bin/env python3
"""Render a review (taqriz) JSON {header, body[], signature[]} to DOCX with the sample's page setup and formatting.
Usage: python3 -I render_taqriz.py review.json out.docx [kind-label]"""
import json, sys, copy
import docx
from docx.shared import Pt, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.oxml.ns import qn

SAMPLE = '/tmp/claude-0/-home-user-atlant-impossible/a3417e0c-827d-5a22-9511-48e2f1305e74/scratchpad/taqriz_sample/sample.docx'
rev = json.load(open(sys.argv[1], encoding='utf-8'))
out = sys.argv[2]

doc = docx.Document(SAMPLE)                 # page setup A4, margins 3/2/2/2 cm
body = doc.element.body
for el in list(body):
    if el.tag != qn('w:sectPr'):
        body.remove(el)
for sec in doc.sections:                    # no headers/footers from the sample
    for part in (sec.header, sec.footer):
        for p in part.paragraphs:
            p.text = ''
cp = doc.core_properties
cp.author = ''; cp.last_modified_by = ''; cp.title = 'Taqriz'; cp.comments = ''; cp.subject = ''; cp.keywords = ''

def para(text, align=WD_ALIGN_PARAGRAPH.JUSTIFY, indent=1.25, bold=False, after=0, before=0, keep=False):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.alignment = align
    pf.first_line_indent = Cm(indent) if indent else None
    pf.line_spacing = 1.15
    pf.space_after = Pt(after); pf.space_before = Pt(before)
    pf.keep_with_next = keep
    r = p.add_run(text)
    r.font.name = 'Times New Roman'; r.font.size = Pt(14); r.bold = bold
    r._element.rPr.rFonts.set(qn('w:eastAsia'), 'Times New Roman')
    return p

para(rev['header'], indent=0, after=6)
para('TAQRIZ', align=WD_ALIGN_PARAGRAPH.CENTER, indent=0, bold=True, after=6)
for t in rev['body']:
    para(t)
para('', indent=0)
sig = rev['signature']
text_w = Cm(21.0 - 3.0 - 2.0)
for i, line in enumerate(sig):
    bold = line.rstrip().endswith(':') and i == 0
    if '____' in line and '  ' in line:
        # "left  ____  right": left text, signature line and name pushed to the right margin with tab stops
        parts = [s for s in line.split('  ') if s.strip()]
        p = doc.add_paragraph()
        pf = p.paragraph_format
        pf.line_spacing = 1.15; pf.space_after = Pt(0)
        pf.tab_stops.add_tab_stop(Cm(10.5), WD_TAB_ALIGNMENT.LEFT)
        pf.tab_stops.add_tab_stop(text_w, WD_TAB_ALIGNMENT.RIGHT)
        r = p.add_run('\t'.join(s.strip() for s in parts))
        r.font.name = 'Times New Roman'; r.font.size = Pt(14)
    else:
        para(line, align=WD_ALIGN_PARAGRAPH.LEFT, indent=0, bold=bold, before=6 if (bold and i) else 0)
doc.save(out)
print('saved', out)
