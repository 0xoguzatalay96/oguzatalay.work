import docx
import copy
import re

def sync_cv():
    doc = docx.Document('Oguz_Atalay_CV (3).docx')
    
    # 1. Update contact info line (p[2])
    p_contact = doc.paragraphs[2]
    old_contact = p_contact.text
    new_contact = old_contact.replace('oguzatalay96@gmail.com', 'oguz@oguzatalay.work')
    for r in p_contact.runs:
        if 'oguzatalay96@gmail.com' in r.text:
            r.text = r.text.replace('oguzatalay96@gmail.com', 'oguz@oguzatalay.work')
    print("Contact updated:", p_contact.text)
    
    # 2. Update Professional Summary (p[4]) to remove 'lead' and match markdown
    p_sum = doc.paragraphs[4]
    for r in p_sum.runs:
        if 'continuing to lead' in r.text:
            r.text = r.text.replace('continuing to lead', 'continuing to manage')
    print("Summary updated:", 'continuing to manage' in p_sum.text)

    # 3. Update Core Competencies item for Digital Asset
    for p in doc.paragraphs:
        if 'Digital Asset & Blockchain Marketing:' in p.text:
            for r in p.runs:
                if 'Digital Asset & Blockchain Marketing:' in r.text:
                    r.text = r.text.replace('Digital Asset & Blockchain Marketing:', 'Digital Asset & Blockchain Marketing Operations:')
            print("Competency updated:", p.text)

    # 4. Update Yuga Labs bullets (remove 'leadership' and 'mainstream')
    for p in doc.paragraphs:
        if 'leadership stakeholders' in p.text:
            for r in p.runs:
                if 'leadership stakeholders' in r.text:
                    r.text = r.text.replace('leadership stakeholders', 'executive stakeholders')
            print("Yuga bullet updated (leadership -> executive)")
        if 'mainstream brand partnership' in p.text:
            for r in p.runs:
                if 'mainstream brand partnership' in r.text:
                    r.text = r.text.replace('mainstream brand partnership', 'consumer brand partnership')
            print("Yuga bullet updated (mainstream -> consumer)")

    # 5. Update TEM Agency bullets (remove 'leading creator teams' and 'Led HP OMEN')
    for p in doc.paragraphs:
        if 'leading creator teams' in p.text:
            for r in p.runs:
                if 'leading creator teams' in r.text:
                    r.text = r.text.replace('leading creator teams', 'coordinating creator teams')
            print("TEM bullet updated (leading -> coordinating)")
        if 'Led HP OMEN' in p.text:
            for r in p.runs:
                if 'Led HP OMEN' in r.text:
                    r.text = r.text.replace('Led HP OMEN', 'Managed HP OMEN')
                if 'managed creator mechanics' in r.text:
                    r.text = r.text.replace('managed creator mechanics', 'oversaw creator mechanics')
            print("TEM bullet updated (Led HP OMEN -> Managed HP OMEN)")

    # 6. Remove empty paragraphs (paragraphs with only whitespace between experiences)
    p_elements_to_remove = []
    for i, p in enumerate(doc.paragraphs):
        if not p.text.strip():
            # check if between experience items
            p_elements_to_remove.append(p)
            
    for p in p_elements_to_remove:
        p_elem = p._element
        if p_elem.getparent() is not None:
            p_elem.getparent().remove(p_elem)
    print(f"Removed {len(p_elements_to_remove)} empty paragraphs")

    # 7. Update Certifications to exact full titles matching Oguz_Atalay_CV.md
    final_10_certs = [
        'Google Digital Marketing & E-commerce — Google (8 Courses)',
        'Google Data Analytics Professional Certificate — Google (9 Courses)',
        'Google Project Management Professional Certificate — Google (7 Courses)',
        'Meta Community Management Professional Certificate — Meta (4 Courses)',
        'Microsoft Power BI Data Analyst Professional Certificate — Microsoft (8 Courses)',
        'Influencer Marketing Strategy — Rutgers, The State University of New Jersey (1 Course)',
        'Decentralized Finance (DeFi): The Future of Finance — Duke University (4 Courses)',
        'Blockchain Revolution in Financial Services — INSEAD (4 Courses)',
        'Web3 and Blockchain in Global Commerce — INSEAD & Blockchain Research Institute (4 Courses)',
        'Blockchain Specialization — University at Buffalo (4 Courses)'
    ]

    cert_idx = None
    edu_idx = None
    for i, p in enumerate(doc.paragraphs):
        if p.text.strip() == 'CERTIFICATIONS':
            cert_idx = i
        elif p.text.strip() == 'EDUCATION':
            edu_idx = i

    if cert_idx is not None and edu_idx is not None:
        template_p = doc.paragraphs[cert_idx + 1]
        template_xml = template_p._element
        
        # Remove items between CERTIFICATIONS and EDUCATION
        for _ in range(cert_idx + 1, edu_idx):
            p_to_remove = doc.paragraphs[cert_idx + 1]
            p_element = p_to_remove._element
            p_element.getparent().remove(p_element)

        heading_p = doc.paragraphs[cert_idx]
        current_element = heading_p._element

        for item in final_10_certs:
            new_el = copy.deepcopy(template_xml)
            for t_node in new_el.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                t_node.text = item
                break
            t_nodes = list(new_el.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'))
            if len(t_nodes) > 1:
                t_nodes[0].text = item
                for extra in t_nodes[1:]:
                    extra.text = ''
            current_element.addnext(new_el)
            current_element = new_el
        print("Updated 10 certifications with full course counts")

    doc.save('Oguz_Atalay_CV (3).docx')
    print("Saved Oguz_Atalay_CV (3).docx")

if __name__ == '__main__':
    sync_cv()
