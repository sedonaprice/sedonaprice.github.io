+++
title: "{{ replace .Name "-" " " | title }}"
draft: false

[menu.main]
  identifier = "{{ lower (replace .Name '-' '')  }}"
  weight = 200
  parent = ""
+++

# {{ replace .Name "-" " " | title }}
