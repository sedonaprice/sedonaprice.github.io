#!/bin/bash

files=( research.html index.html teaching.html )
for i in "${files[@]}"
do
	echo $i sedona@pcir30.mpe.mpg.de:~/public_html/
	scp $i sedona@pcir30.mpe.mpg.de:~/public_html/
done
