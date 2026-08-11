#!/usr/bin/env python3
"""Merge Ferrum AI cover + body into single PDF."""
from pypdf import PdfReader, PdfWriter

A4_W, A4_H = 595.28, 841.89

def normalize_page(page):
    box = page.mediabox
    w, h = float(box.width), float(box.height)
    # Always scale to exact A4
    page.scale_to(A4_W, A4_H)
    # Also explicitly set the mediabox
    page.mediabox.upper_right = (A4_W, A4_H)
    page.mediabox.lower_left = (0, 0)
    return page

cover_pdf = '/home/z/my-project/scripts/ferrum_ai_cover.pdf'
body_pdf = '/home/z/my-project/scripts/ferrum_ai_body.pdf'
output = '/home/z/my-project/download/Ferrum_AI_Design_Intelligence_Architecture.pdf'

writer = PdfWriter()
# Cover first
writer.add_page(normalize_page(PdfReader(cover_pdf).pages[0]))
# Body pages
for page in PdfReader(body_pdf).pages:
    writer.add_page(normalize_page(page))

writer.add_metadata({
    '/Title': 'Ferrum AI Design Intelligence Architecture',
    '/Author': 'Z.ai',
    '/Creator': 'Z.ai',
    '/Subject': 'Ferrum AI Intelligence Layer - Complete Architecture Document'
})
with open(output, 'wb') as f:
    writer.write(f)

print(f'Merged PDF: {output}')