---
layout: docs
title: Verathread Shell Layouts
description: This document lays out the key elements of the Verathread shell, including a prominent logo for brand identity, a customisable navbar with dynamic menu items, a search function for easy navigation, and accessible profile settings. Additionally, the document covers the implementation of a light/dark theme switcher to accommodate user preferences, and a flexible content area for displaying app information.
group: components
toc: true
---

## How it works


Here's what you need to know before getting started with the Verathread shell:

- Auth-layouts: [Auth Layouts]({{< docsref "/verathread-layouts/auth-layouts" >}})
- Error-layouts: [Error Layouts]({{< docsref "/verathread-layouts/error-layouts" >}})

## Shell Structure

- Navbar: The layout uses the standard [Bootstrap layout]({{< docsref "/components/navbar.md" >}}), the content is dynamically added based on your subscription and your Navbar will be populated by this information.
- Content Area: 'Content to add'!
- User management: 'Content to add'!
- Footer: This is predefined and can not be altered.

Here's an example of all the sub-components included in a responsive light-themed Verathread shell that will host the various Apps you add to the content this includes a fixed height content section which is not scrollable.

<!-- markdownlint-disable MD033 -->
{{< example >}}
  <nav class="bg-brand">
    <div class="container-fluid d-flex  bd-gutter flex-wrap flex-lg-nowrap">
      <div class="row me-auto bg-brand">
        <div class="col-12 d-flex">
          <div class="navbar-brand p-0 me-0 me-lg-2">
            <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="brand logo" height="40"/>
          </div>
          <ul class="nav justify-content-center align-items-center">
            <li class="nav-item">
              <a class="nav-link active text-white" aria-current="page" href="#">Apps</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#">Settings</a>
            </li>
          </ul>
        </div>
      </div>
    <div class="row">
      <div class="col-12">
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <img src="/docs/5.3/assets/logos/icon_mode.png" alt="">
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <img src="/docs/5.3/assets/logos/icon_alert.png" alt="">
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <img src="/docs/5.3/assets/logos/icon_avatar.png" alt="">
            </a>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </nav>
  <main class="container ratio ratio-16x9 border border-black bg-secondary-subtle">
    <div class="d-flex flex-column align-items-center justify-content-center p-4">
      <h1>Content</h1>
      <p>Content goes here.</p>
    </div>
< /main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->

This example uses the Verathread Brand background and [spacing]({{< docsref "/utilities/spacing" >}}) (`me-auto`, `mb-2`, `mb-lg-0`, `me-2`) utility classes.

#### Examples

## 01. Header with content scrollable

<!-- markdownlint-disable MD033 -->
{{< example >}}
  <nav class="bg-brand">
    <div class="container-fluid d-flex  bd-gutter flex-wrap flex-lg-nowrap">
      <div class="row me-auto bg-brand">
        <div class="col-12 d-flex">
          <div class="navbar-brand p-0 me-0 me-lg-2">
            <img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="brand logo" height="40"/>
          </div>
          <ul class="nav justify-content-center align-items-center">
            <li class="nav-item">
              <a class="nav-link active text-white" aria-current="page" href="#">Apps</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" href="#">Settings</a>
            </li>
          </ul>
        </div>
      </div>
    <div class="row">
      <div class="col-12">
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              <img src="/docs/5.3/assets/logos/icon_mode.png" alt="">
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <img src="/docs/5.3/assets/logos/icon_alert.png" alt="">
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <img src="/docs/5.3/assets/logos/icon_avatar.png" alt="">
            </a>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </nav>
<main class="container ratio ratio-16x9 border border-black bg-secondary-subtle h-500 overflow-x-scroll">
  <div class="d-flex flex-column align-items-center justify-content-center p-4">
    <h1>Content</h1>
    <p>Content goes here.</p>
  </div>
</main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->

## 01. No Navbar in the header

<!-- markdownlint-disable MD033 -->
{{< example >}}
<main class="container ratio ratio-16x9 border border-black bg-secondary-subtle">
  <div class="d-flex flex-column align-items-center justify-content-center p-4 h-500">
    <h1>Content</h1>
    <p>Content goes here. - Scrollable</p>
    <p>lorem*500</p>
  </div>
</main>
{{< /example >}}
<!-- markdownlint-enable MD033 -->

### Brand

The `.navbar-brand` can be applied to most elements, but an anchor works best, as some elements might require utility classes or custom styles.
Add your text within an element with the `.navbar-brand` class.

{{< example >}}
<!-- As a link -->
<!--markdownlint-disable MD033-->
<nav class="navbar bg-body-tertiary">
  <div class="container-fluid bg-brand">
    <a class="navbar-brand" href="#"><img src="/docs/5.3/assets/logos/Verathread-Tagline-Colour-Rev.png" alt="Verathread Logo" width="200" /></a>
  </div>
</nav>
{{< /example >}}
<!-- markdownlint-enable MD033 -->

## CSS

### Variables

As part of Verathread's evolving CSS variables approach, navbars now use local CSS variables on `.navbar` for enhanced real-time customization. Values for the CSS variables are set via Sass, so Sass customization is still supported, too.

{{< scss-docs name="navbar-css-vars" file="node_modules/bootstrap/scss/_navbar.scss" >}}

Some additional CSS variables are also present on `.navbar-nav`:

{{< scss-docs name="navbar-nav-css-vars" file="node_modules/bootstrap/scss/_navbar.scss" >}}

Customization through CSS variables can be seen on the `.navbar-dark` class where we override specific values without adding duplicate CSS selectors.

{{< scss-docs name="navbar-dark-css-vars" file="node_modules/bootstrap/scss/_navbar.scss" >}}

### Sass variables

Variables for all navbars:

{{< scss-docs name="navbar-variables" file="node_modules/bootstrap/scss/_variables.scss" >}}

Variables for the [dark navbar](#color-schemes):

{{< scss-docs name="navbar-dark-variables" file="node_modules/bootstrap/scss/_variables.scss" >}}

### Sass loops

[Responsive navbar expand/collapse classes](#responsive-behaviors) (e.g., `.navbar-expand-lg`) are combined with the `$breakpoints` map and generated through a loop in `scss/_navbar.scss`.

{{< scss-docs name="navbar-expand-loop" file="node_modules/bootstrap/scss/_navbar.scss" >}}
