#!/usr/bin/bash
#a hack for adding js extension to (extension)less js imports in typescript
set -xe
pattern='"; \/\*EXT\*\/' #this keyword (pattern) is necessary ;)

sed -Ei "s/$pattern/\.js\"/" $(ls ./build/*.js)

