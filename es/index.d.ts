export declare interface Limits {
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
    limits: Limits
}

/**
 * Make a sticker (element) "sticky" to its container (element) or just to itself.
 * @param container container. For which container's scroll, the sticker will respond to.
 * @param sticker sticker. If sticker is passed as null, clear all sticky relations on passed container.
 * @param limits movement constraint.
 * @param options options
 */
 declare function stickElement(container: HTMLElement, sticker: HTMLElement | null, options?: {
    limits?: {
        relative_to?: 'self' | 'container';
        top?: number;
        left?: number;
    };
    destroy?: boolean;
    override?: boolean;
}): void;

export default stickElement