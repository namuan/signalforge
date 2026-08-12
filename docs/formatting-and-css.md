# Formatting and CSS patterns

Copy [`examples/configuration/oxfmt`](../examples/configuration/oxfmt) and adapt
its paths. The base pattern uses an 80-column print width and ES5 trailing
commas. It formats configuration and hand-written declarations while excluding
generated files by naming convention.

Tailwind ordering depends on the stylesheet that owns the source tree. Point
the copied configuration at that entry point and add separate overrides when
themes differ. The composition functions are `clsx`, `cn`, and `cva`.

## Closed Tailwind theme

Reset the complete default theme before defining local tokens:

```css
@theme {
  --*: initial;
  --color-action: oklch(0.62 0.19 252);
  --spacing-control-inline: 1rem;
}
```

The reset is mandatory for this pattern. Without it, an agent can select from
Tailwind's default palette, spacing, radii, typography, and breakpoints even
when those values are absent from the design system.

Define the smallest set of meaningful tokens and reusable components needed by
the interface. Combine the closed theme with:

- `better-tailwindcss` unknown, deprecated, duplicate, concatenated,
  conflicting, and restricted-class rules;
- custom rules that reject unapproved native interactive elements;
- a rule that rejects alternate styling mechanisms such as JSX `style`;
- an approved `className` composition helper;
- component-library boundaries for repeated interactive behavior.

The reference lint factory restricts arbitrary bracket classes by default so an
agent cannot bypass missing tokens with values such as `bg-[#123456]` or
`rounded-[7px]`.

[`examples/tailwind-smoke`](../examples/tailwind-smoke) demonstrates a stronger
check than “the compiler exited successfully”: compile a neutral entry point,
assert representative custom selectors exist, and assert probed default
selectors are absent.

The reference repository exposes explicit read and write modes:

```sh
npm run format:check
npm run format:fix
npm run css:check
```
