import re
import json

def parse_products(text):
    # Remove the header
    text = re.sub(r'^.*?NAME\s+DESCRIPTION\s+PRODUCT\s+PRICE\s+', '', text, flags=re.DOTALL | re.IGNORECASE)
    
    # Regex to find prices
    # Matches ₱ followed by numbers, dashes, and optional "pesos" or "Pesos"
    # Also handles some stray characters like 'v' or 's' seen in the text
    price_pattern = r'₱\s*[\d,.-]+[vVsS]?\s*[pP]esos?'
    
    # Find all price matches and their positions
    price_matches = list(re.finditer(price_pattern, text))
    
    products = []
    last_pos = 0
    
    for i, match in enumerate(price_matches):
        price_str = match.group(0).strip()
        end_pos = match.end()
        
        # The text before this price (and after the previous price)
        # contains the name and description
        chunk = text[last_pos:match.start()].strip()
        
        if chunk:
            lines = [l.strip() for l in chunk.split('\n') if l.strip()]
            if lines:
                name = lines[0]
                description = " ".join(lines[1:])
                
                # Check if price has some trailing text that belongs to next product
                # or if it's mixed with current description
                # In some cases, the price is in the middle of a line.
                # But our match.start() handles that.
                
                products.append({
                    "name": name,
                    "description": description,
                    "price": price_str
                })
        
        last_pos = end_pos

    return products

if __name__ == "__main__":
    with open("extracted_text.txt", "r", encoding="utf-8") as f:
        text = f.read()
    
    products = parse_products(text)
    
    # Clean up names and descriptions (remove multiple spaces)
    for p in products:
        p["name"] = re.sub(r'\s+', ' ', p["name"])
        p["description"] = re.sub(r'\s+', ' ', p["description"])
        # Remove extra chars from price
        p["price"] = re.sub(r'\s+', ' ', p["price"])

    with open("products.json", "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
