---
layout: docs
title: Verathread Error Layouts
description: This document provides developers with a comprehensive guide on creating effective error pages, emphasizing the importance of clear, user-friendly messages and consistent design. It outlines key elements such as the error code, the main error message and optional visual elements. An example layout is provided to illustrate these components.
group: components
toc: true
---

## How it works

Here's what you need to know before getting started with the error pages:

- Errors follow standard conventions and you are able to style them within certain parameters.
- The Icon on the top is optional and you can choose to include it or not.

## Error Page Structure

<!-- markdownlint-disable MD033 -->
{{< example >}}
<main class="ratio ratio-16x9 bg-brand-linear">
  <div class="container d-flex align-items-center justify-content-center gap-10">
    <div>
     <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="Verathread" width="300" loading="lazy">
     </div>
    <div class="bg-light h-75 p-7 d-flex flex-column rounded-2 w-40">
      <!-- <img src="/docs/5.3/assets/logos/icon_error-404.png" class="mb-3" alt="Service unavailable" width="100" /> -->
      <p>Icon is optional</p>
      <h3><span class="text-danger">Code (eg. 404):</span> Error description</h3>
      <p>More detailed description of the error</p>
    </div>
  </div>
</main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->

## 404: Page not found error with Icon

<!-- markdownlint-disable MD033 -->
{{< example >}}
<main class="ratio ratio-16x9 bg-brand-linear">
  <div class="container d-flex justify-content-center align-items-center gap-10">
    <div>
     <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="Verathread" width="300" loading="lazy">
     </div>
    <div class="bg-light h-75 p-7 d-flex flex-column rounded-2 w-40">
      <img src="/docs/5.3/assets/logos/icon_error-404.png" class="mb-3" alt="Service unavailable" width="100" />
      <h3><span class="text-danger">404:</span> Page not found</h3>
      <p>The page you are looking does not exist, or an error occurred.</p>
    </div>
  </div>
</main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->

## 503 Service Unavailable error (Without the Icon)

<!-- markdownlint-disable MD033 -->
{{< example >}}
<main class="vt-land ratio ratio-16x9 bg-brand-linear">
  <div class="container d-flex align-items-center justify-content-center gap-10">
    <div>
     <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="Verathread" width="300" loading="lazy">
     </div>
    <div class="bg-light h-75 p-7 d-flex flex-column rounded-2 w-40">
      <!-- <img src="/docs/5.3/assets/logos/icon_error-503.png" class="mb-5" alt="Service unavailable" width="100" /> -->
      <h3 class="mb-5"><span class="text-danger">503:</span> Service interruption</h3>
      <p class="mb-auto">Sorry. Our service is experiencing a temporary interruption</p>
      <small>Please <a href="#">contact</a> us if the issue persists.</small>
    </div>
  </div>
</main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->

## 503 Service Unavailable, with retry action button

<!-- markdownlint-disable MD033 -->
{{< example >}}
<main class="vt-land ratio ratio-16x9 bg-brand-linear">
  <div class="container d-flex align-items-center justify-content-center gap-10">
    <div>
     <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="Verathread" width="300" loading="lazy">
     </div>
    <div class="bg-light h-75 p-7 d-flex flex-column rounded-2 w-40">
      <!-- <img src="/docs/5.3/assets/logos/icon_error-503.png" class="mb-5" alt="Service unavailable" width="100" /> -->
      <h3 class="mb-5"><span class="text-danger">503:</span> Service interruption</h3>
      <p class="mb-auto">Sorry. Our service is experiencing a temporary interruption</p>
      <div class="mt-auto">
            <button type="button" class="btn btn-sm text-white bg-info">Retry</button>
          </div>
    </div>
  </div>
</main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->