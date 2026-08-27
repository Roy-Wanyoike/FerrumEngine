import json, re, sys

files = [
    ("Tailwind CSS", "tailwind-nav.json"),
    ("Animate.css", "animate-nav.json"),
    ("Framer Motion", "motion-nav.json"),
    ("GSAP", "gsap-nav.json"),
]

for name, fname in files:
    print(f"\n{'='*60}")
    print(f"  {name}")
    print(f"{'='*60}")
    with open(fname) as f:
        data = json.load(f)

    html = data.get("html", "")
    text = data.get("text", "")
    print(f"Title: {data.get('title', 'N/A')}")

    # Extract nav links
    nav_match = re.search(r"<nav[^>]*>(.*?)</nav>", html, re.DOTALL)
    header_match = re.search(r"<header[^>]*>(.*?)</header>", html, re.DOTALL)

    nav_html = ""
    if nav_match:
        nav_html = nav_match.group(1)
    elif header_match:
        nav_html = header_match.group(1)

    if nav_html:
        # Get all links with href
        links = re.findall(
            r'<a[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>',
            nav_html,
            re.DOTALL,
        )
        print(f"\nNav links found: {len(links)}")
        for href, link_text in links[:30]:
            clean = re.sub(r"<[^>]+>", "", link_text).strip()
            if clean and len(clean) < 60:
                print(f"  [{clean}] -> {href}")

    # Text preview
    print(f"\nText preview (first 600 chars):\n{text[:600]}")
    print()