/**
 * Make a sticker (element) "sticky" to its container (element) or just to itself.
 * @param container Container. For which container's scroll, the sticker will respond to.
 * @param sticker Sticker. If sticker is passed as null, clear all sticky relations on passed container.
 * @param movement Movement constraint.
 * @param options Options.
 */
declare function stickElement(container: HTMLElement, sticker: HTMLElement | null, options?: {
    movement?: {
        relative_to?: 'self' | 'container';
        top?: number;
        left?: number;
    };
    destroy?: boolean;
    override?: boolean;
}): void;
export default stickElement;
