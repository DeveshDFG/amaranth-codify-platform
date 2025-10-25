<!--
  @component

  A horizontal line component that can be customized with thickness and style.

  @example
  ```svelte
    <Line thickness={2}/>
    <Line thickness={4} style="dashed" />
    <Line thickness={1} style="dotted" />
   ```
-->
<script lang="ts">
interface LineProps {
  /**
   * Color of the line, accepts any css color value, including CSS variables.
   * @default "var(--cds-text-primary)"
   */
  color?: string;
  /**
   * Thickness of the line in pixels.
   * @default 2
   */
  thickness?: number;
  /**
   * Style of the line, accepts all css values, besides none and hidden.
   * @default "solid"
   */
  style?:
    | "dotted"
    | "solid"
    | "dashed"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset";
}

const {
  thickness = 2,
  style = "solid",
  color = "var(--cds-text-primary)",
}: LineProps = $props();
</script>

<div
  style={`width: 100%; border-bottom: ${thickness}
  px
  ${style}
  ${color}`}
></div>
