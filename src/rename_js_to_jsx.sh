for x in $(find . -name \*.jsx); do
  mv $x $(echo "$x" | sed 's/\.jsx$/.js/')
done