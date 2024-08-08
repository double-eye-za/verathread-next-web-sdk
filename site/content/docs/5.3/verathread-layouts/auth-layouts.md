---
layout: docs
title: Verathread Auth Layouts
description: This document offers developers a detailed guide on designing authentication pages, including login, logged out, and initial account setup pages. Key elements for these pages include clear instructions and success and progress indicators. Best practices highlighted in the document include maintaining a consistent design and ensuring accessibility. Example authentication pages are provided through-out this document.
group: components
toc: true
---

## How it works

Here's what you need to know before getting started with the Auth. pages:

- Authorization is provided by Auth0, these are validated through the backend

## Auth Page Structure

<!-- markdownlint-disable MD033 -->
{{< example >}}
<main class="landing ratio ratio-16x9 bg-brand-linear">
  <div class="container d-flex align-items-center justify-content-center gap-10">
    <div>
     <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="Verathread" width="300" loading="lazy">
     </div>
    <div class="bg-light h-75 p-2 d-flex justify-content-center align-items-center rounded-2 w-40">
      <h1>Auth Content</h1>
    </div>
  </div>
</main>

{{< /example >}}
<!-- markdownlint-enable MD033 -->

## Login Page

Provide context and instructions for the user to log in. .

<!-- markdownlint-disable MD033 -->
{{< example >}}
  <main class="landing ratio ratio-16x9 bg-brand-linear">
  <div class="container d-flex align-items-center justify-content-center gap-10">
    <div class="d-flex justify-content-center align-items-center">
     <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="Verathread" width="300" loading="lazy">
     </div>
    <div class="bg-light h-75 p-7 d-flex flex-column rounded-2 w-40">
      <h3 class="d-flex align-items-center">
      <img src="/docs/5.3/assets/logos/icon_login.png" width="30" alt="Application not found" loading="lazy" /> Login</h3>
      <p>The content you are trying to access requires you to be logged in. Please click the button to continue.</p>
      <div class="mt-auto">
        <button type="button" class="btn btn-sm text-white bg-info">Login to continue</button>
      </div>
    </div>
  </div>
</main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->

## Logged out Page

Provide context and instructions for the user to log out.

<!-- markdownlint-disable MD033 -->
{{< example >}}
    <main class="landing ratio ratio-16x9 bg-brand-linear">
      <div class="container d-flex align-items-center justify-content-center gap-10">
        <div>
        <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="Verathread" width="300" loading="lazy">
        </div>
        <div class="bg-light h-75 p-7 d-flex flex-column rounded-2 w-40">
          <h3>Logged out</h3>
          <p>You have been logged out, you can clcik the button below to login again.</p>
          <div class="mt-auto">
            <button type="button" class="btn btn-sm text-white bg-info">Login</button>
          </div>
        </div>
      </div>
    </main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->


## Please wait Page

Provide context and instructions for the user to wait for the page to load.

<!-- markdownlint-disable MD033 -->
{{< example >}}
  <main class="landing ratio ratio-16x9 bg-brand-linear">
      <div class="container d-flex align-items-center justify-content-center gap-10">
        <div>
          <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="Verathread" width="300" loading="lazy">
        </div>
      <div class="bg-light h-75 p-7 d-flex flex-column rounded-2  w-40">
           <div class="d-flex align-items-center justify-content-center mt-4">
            <img src="/docs/5.3/assets/img/examples/img_example-progress.png" alt="progress example" width="130" />
           </div>
          <div class="mt-auto">
            <h2>Please wait</h2>
            <p>You will be logged out and it requires you to login again when you access Verathread.</p>
          </div>
        </div>
      </div>
    </main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->

## Error pages for Auth.

If there is an error this will provide feedback on the error.

<!-- markdownlint-disable MD033 -->
{{< example >}}
  <main class="landing ratio ratio-16x9 bg-brand-linear">
      <div class="container d-flex align-items-center justify-content-center gap-10">
        <div>
          <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="Verathread" width="300" loading="lazy">
        </div>
      <div class="bg-light h-75 p-7 d-flex flex-column rounded-2 w-40">
          <div class="d-flex align-items-center justify-content-center pt-3">
            <img src="/docs/5.3/assets/logos/icon_login-error.png" width="130" alt="Application not found" loading="lazy" />
          </div>
          <div class="mt-auto">
            <h4><strong>It doesn't look like you have any apps installed.</strong></h4>
            <p>Start by adding apps to your installation.</p>
          </div>
        </div>
      </div>
  </main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->