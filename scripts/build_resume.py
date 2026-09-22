"""Rebuild the static resume from the backend's portfolio data. Requires reportlab."""
from pathlib import Path
import json
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

root = Path(__file__).resolve().parents[1]
data = json.loads((root.parent / 'vigneshwarancj_portfolio_backend/portfolio_data.json').read_text(encoding='utf-8'))
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='BodyResume', fontName='Helvetica', fontSize=9, leading=13, spaceAfter=7, textColor=colors.HexColor('#26344a')))
styles.add(ParagraphStyle(name='SectionResume', fontName='Helvetica-Bold', fontSize=10, leading=14, spaceBefore=12, spaceAfter=7, textColor=colors.HexColor('#1d4ed8'), keepWithNext=True))
styles.add(ParagraphStyle(name='ItemResume', fontName='Helvetica-Bold', fontSize=10, leading=14, spaceAfter=4, keepWithNext=True))
def safe(text):
 return escape(str(text).replace('—','-').replace('–','-').replace('’',"'").replace('→',' to ').replace('²','2').replace('≈','approximately '))
def para(text, style='BodyResume'):
 return Paragraph(safe(text), styles[style])
story=[Paragraph(safe(data['personal']['name']),styles['Title']),para('AI / ML Engineer and Full-Stack Developer'),para('Coimbatore, India | '+data['personal']['email']),para(data['personal']['linkedin']+' | '+data['personal']['github']),Spacer(1,5)]
story += [para('PROFILE','SectionResume'),para('Full-stack developer and AI / ML engineer with an M.Tech in Big Data Biology. Work spans desktop agents, enterprise applications, WhatsApp automation, real-time networking, and computational biology tools.')]
story += [para('EXPERIENCE','SectionResume')]
for role in data['work_experience']:
 story += [para(role['role']+' | '+role['company'],'ItemResume'),para(role['period']),para(role['overview'])]
story += [para('SELECTED PROJECTS','SectionResume')]
for name in ['PocketPet','Syncly','GlycanBench: a unified resource for working with glycans']:
 project=data['projects'].get(name)
 if project:
  story += [para(name,'ItemResume'),para(project.get('description','')),para('Technologies: '+', '.join(project.get('tech_stack',[])))]
story += [para('EDUCATION','SectionResume')]
for item in data['education']:
 story += [para(item['degree'],'ItemResume'),para(item['institution']+' | '+item['period']+' | '+item['grade'])]
story += [para('TECHNICAL SKILLS','SectionResume')]
for category,skills in data['skills'].items():
 if isinstance(skills,list): story += [para(category.replace('_',' ').title()+': '+', '.join(str(x) for x in skills))]
story += [para('CERTIFICATIONS','SectionResume')]
for item in data['certifications']: story += [para(item['title']+' | '+item['issuer'])]
def footer(c,doc):
 c.setFont('Helvetica',8); c.setFillColor(colors.HexColor('#64748b')); c.drawString(44,26,'Vigneshwaran C. J. | Portfolio resume'); c.drawRightString(568,26,str(doc.page))
SimpleDocTemplate(str(root/'resume.pdf'),pagesize=(612,792),rightMargin=44,leftMargin=44,topMargin=36,bottomMargin=44,title='Vigneshwaran C. J. Resume',author='Vigneshwaran C. J.').build(story,onFirstPage=footer,onLaterPages=footer)
print(root/'resume.pdf')
