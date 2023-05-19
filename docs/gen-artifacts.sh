#!/bin/bash
set -ex

echo This script relies on @mermaid-js/mermaid-cli being installed as a global dependency
echo To install run the following line of code
echo npm install -g @mermaid-js/mermaid-cli

cd "$(dirname "$0")"

npx mmdc -i ./artists/class-diagram.md -o ./artists/class-diagram.png -t dark -b transparent
npx mmdc -i ./customers/class-diagram.md -o ./customers/class-diagram.png -t dark -b transparent

mv ./artists/class-diagram-1.png ./artists/class-diagram.png
mv ./customers/class-diagram-1.png ./customers/class-diagram.png