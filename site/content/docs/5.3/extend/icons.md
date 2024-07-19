---
layout: docs
title: Font-Awesome Icons
description: Guidance and suggestions for using icon libraries with Verathread.
group: extend
---



While most icon sets include multiple file formats, we prefer SVG implementations for their improved accessibility and vector support.

## Font Awsome Icons

We've tested and used these icon sets ourselves.

{{< markdown >}}
{{< icons.inline >}}
{{- $type := .Get "type" | default "preferred" -}}

{{- range (index .Site.Data.icons $type) }}
- [{{ .name }}]({{ .website }})
{{- end }}
{{< /icons.inline >}}
{{< /markdown >}}

