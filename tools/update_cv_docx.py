import docx
import copy

def update_docx():
    doc = docx.Document('Oguz_Atalay_CV (3).docx')

    final_10 = [
        'Google Digital Marketing & E-commerce — Google',
        'Google Data Analytics — Google',
        'Google Project Management — Google',
        'Meta Community Management — Meta',
        'Microsoft Power BI Data Analyst — Microsoft',
        'Influencer Marketing Strategy — Rutgers, The State University of New Jersey',
        'Decentralized Finance (DeFi): The Future of Finance — Duke University',
        'Blockchain Revolution in Financial Services — INSEAD',
        'Web3 and Blockchain in Global Commerce — INSEAD',
        'Blockchain Specialization — University at Buffalo'
    ]

    cert_idx = None
    edu_idx = None
    for i, p in enumerate(doc.paragraphs):
        if p.text.strip() == 'CERTIFICATIONS':
            cert_idx = i
        elif p.text.strip() == 'EDUCATION':
            edu_idx = i

    print(f'Found CERTIFICATIONS at {cert_idx}, EDUCATION at {edu_idx}')

    # Grab a template element from one of the existing list items
    template_p = doc.paragraphs[cert_idx + 1]
    template_xml = template_p._element

    # Remove all existing list items between CERTIFICATIONS and EDUCATION
    for _ in range(cert_idx + 1, edu_idx):
        p_to_remove = doc.paragraphs[cert_idx + 1]
        p_element = p_to_remove._element
        p_element.getparent().remove(p_element)

    # Insert 10 new items after CERTIFICATIONS heading
    heading_p = doc.paragraphs[cert_idx]
    current_element = heading_p._element

    for item in final_10:
        new_el = copy.deepcopy(template_xml)
        # Clear all text in new_el and set to item
        # Find the text node (w:t)
        for t_node in new_el.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
            t_node.text = item
            break
        # If multiple t_nodes, clear the rest
        t_nodes = list(new_el.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'))
        if len(t_nodes) > 1:
            t_nodes[0].text = item
            for extra in t_nodes[1:]:
                extra.text = ''
        
        current_element.addnext(new_el)
        current_element = new_el

    doc.save('Oguz_Atalay_CV (3).docx')
    print('Updated Oguz_Atalay_CV (3).docx successfully!')

if __name__ == '__main__':
    update_docx()
