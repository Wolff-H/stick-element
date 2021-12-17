export declare interface Movement {
    relative_to: 'self' | 'container'
    top?: number
    bottom?: number
    left?: number
    right?: number
}

export declare interface Options {
    destroy: boolean
    override: boolean
}

export declare interface StickElementData {
    tool_name: string
    description: string
    container_to_container_data_map: ContainerToContainerDataMap
}

export declare type ContainerToContainerDataMap = WeakMap<HTMLElement, ContainerData>

export declare type ContainerData = StickerData[]

export declare interface StickerData {
    sticker: HTMLElement
    sticker_original_top: number
    sticker_original_left: number
    sticker_original_away_top: number
    sticker_original_away_left: number
    movement: Movement
}

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

export default stickElement