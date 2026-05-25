html_path = r"c:\Users\wogus\Desktop\04. 프로젝트\01. Playground\MD to PPT\themes\slide\propca-notion-style\propca-notion-style.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

print("HTML 파일 크기:", len(content))
print("Section 1 존재 여부:", "Section 1" in content)
print("Brand foundations 존재 여부:", "Brand foundations" in content)

# <h2> 태그가 붙은 텍스트들 추출해서 출력해보기
import re
h2_tags = re.findall(r"<h2.*?>(.*?)</h2>", content)
print("발견된 h2 태그 내용들:")
for h2 in h2_tags[:10]:
    print("-", h2)
