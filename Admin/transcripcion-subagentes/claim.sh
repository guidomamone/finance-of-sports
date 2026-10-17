#!/bin/zsh
# claim.sh : toma el bloque siguiente de chunks.txt (con lock) e imprime sus PDFs, uno por línea.
S=/Users/guidopablomamonesoneira/Claude/Projects/finance-of-sports/Admin/transcripcion-subagentes
until mkdir $S/lock 2>/dev/null; do sleep 0.2; done
n=$(( $(cat $S/pos.txt) + 1 )); echo $n > $S/pos.txt; rmdir $S/lock
sed -n "${n}p" $S/chunks.txt | tr '|' '\n'
