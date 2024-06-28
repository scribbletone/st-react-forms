for x in $(find . -name \*.js); do
  mv $x $(echo "$x" | sed 's/\.js$/.jsx/')
done