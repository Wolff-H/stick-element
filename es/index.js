'use strict';
/**
 * Make a sticker (element) "sticky" to its container (element) or just to itself.
 * @param container Container. For which container's scroll, the sticker will respond to.
 * @param sticker Sticker. If sticker is passed as null, clear all sticky relations on passed container.
 * @param movement Movement constraint.
 * @param options Options.
 */
function stickElement(container, sticker, options) {
    // defaults --------------------------------------------------------------------------------------------------------
    const default_options = {
        movement: {
            relative_to: 'container',
        },
        destroy: false,
        override: false,
    };
    if (!window.__StickElement) {
        window.__StickElement =
            {
                tool_name: 'stick-element',
                description: 'Make element sticky like.',
                container_to_container_data_map: new WeakMap(),
            };
    }
    const map = window.__StickElement.container_to_container_data_map;
    // composed params -------------------------------------------------------------------------------------------------
    const _options = Object.assign({}, default_options, options);
    // do action -------------------------------------------------------------------------------------------------------
    // #1. destroy - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // remove whole record //
    if (sticker === null) {
        if (map.has(container)) {
            map.delete(container);
            container.removeEventListener('scroll', scroll);
        }
        return;
    }
    // remove target sticker //
    if (_options.destroy) {
        const container_data = map.get(container);
        if (container_data) {
            const target_sticker_data_index = container_data.findIndex((sticker_data) => {
                return sticker_data.sticker === sticker;
            });
            if (target_sticker_data_index >= 0) {
                container_data.splice(target_sticker_data_index, 1);
            }
        }
    }
    // #2. create - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    if (!map.has(container)) {
        map.set(container, [
            {
                sticker: sticker,
                sticker_original_top: parseInt(getComputedStyle(sticker).top, 10),
                sticker_original_left: parseInt(getComputedStyle(sticker).left, 10),
                sticker_original_away_top: sticker.getBoundingClientRect().y - container.getBoundingClientRect().y,
                sticker_original_away_left: sticker.getBoundingClientRect().x - container.getBoundingClientRect().x,
                movement: _options.movement,
            },
        ]);
        container.addEventListener('scroll', scroll);
    }
    // #3. update - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    else {
        // override whole container_data to only contain target sticker_data //
        if (_options.override) {
            map.set(container, [
                {
                    sticker: sticker,
                    sticker_original_top: parseInt(getComputedStyle(sticker).top, 10),
                    sticker_original_left: parseInt(getComputedStyle(sticker).left, 10),
                    sticker_original_away_top: sticker.getBoundingClientRect().y - container.getBoundingClientRect().y,
                    sticker_original_away_left: sticker.getBoundingClientRect().x - container.getBoundingClientRect().x,
                    movement: _options.movement,
                },
            ]);
        }
        // update target sticker_data in container_data //
        else if (map.has(container)) {
            const container_data = map.get(container);
            if (container_data) {
                const target_sticker_data_index = container_data.findIndex((sticker_data) => {
                    return sticker_data.sticker === sticker;
                });
                const target_sticker_data = container_data[target_sticker_data_index];
                if (target_sticker_data) {
                    console.log('update: update existed one');
                    container_data[target_sticker_data_index] =
                        {
                            sticker: sticker,
                            sticker_original_top: parseInt(getComputedStyle(sticker).top, 10),
                            sticker_original_left: parseInt(getComputedStyle(sticker).left, 10),
                            sticker_original_away_top: sticker.getBoundingClientRect().y - container.getBoundingClientRect().y,
                            sticker_original_away_left: sticker.getBoundingClientRect().x - container.getBoundingClientRect().x,
                            movement: _options.movement,
                        };
                }
                // add the passed sticker_data as a new one to container_data //
                else {
                    console.log('update: add as new one');
                    const container_data = map.get(container);
                    if (container_data) {
                        container_data.push({
                            sticker: sticker,
                            sticker_original_top: parseInt(getComputedStyle(sticker).top, 10),
                            sticker_original_left: parseInt(getComputedStyle(sticker).left, 10),
                            sticker_original_away_top: sticker.getBoundingClientRect().y - container.getBoundingClientRect().y,
                            sticker_original_away_left: sticker.getBoundingClientRect().x - container.getBoundingClientRect().x,
                            movement: _options.movement,
                        });
                    }
                }
            }
        }
    }
}
function scroll(event) {
    const container = event.target;
    const map = window.__StickElement.container_to_container_data_map;
    const container_data = map.get(container);
    let i = container_data.length;
    while (i--) {
        const sticker_data = container_data[i];
        const { sticker } = sticker_data;
        if (sticker) {
            // relative = self //
            if (sticker_data.movement.relative_to === 'self') {
                // when container scrolled out of certain distance, scroll sticker with the same vector //
                // y-axis //
                if (sticker_data.movement.top !== undefined) {
                    if (container.scrollTop >= sticker_data.movement.top) {
                        sticker.style.top =
                            sticker_data.sticker_original_top +
                                (container.scrollTop - sticker_data.movement.top) +
                                'px';
                    }
                    else {
                        sticker.style.top = sticker_data.sticker_original_top + 'px';
                    }
                }
                // x-axis //
                if (sticker_data.movement.left !== undefined) {
                    if (container.scrollLeft >= sticker_data.movement.left) {
                        sticker.style.left =
                            sticker_data.sticker_original_left +
                                (container.scrollLeft - sticker_data.movement.left) +
                                'px';
                    }
                    else {
                        sticker.style.left = sticker_data.sticker_original_left + 'px';
                    }
                }
            }
            // relative = container //
            else {
                // when margin grown over certain distance, scroll sticker with the same vector //
                // y-axis //
                if (sticker_data.movement.top !== undefined) {
                    if (container.scrollTop >= (sticker_data.sticker_original_away_top - sticker_data.movement.top)) {
                        sticker.style.top =
                            sticker_data.sticker_original_top +
                                (container.scrollTop - (sticker_data.sticker_original_away_top - sticker_data.movement.top)) +
                                'px';
                    }
                    else {
                        sticker.style.top = sticker_data.sticker_original_top + 'px';
                    }
                }
                // x-axis //
                if (sticker_data.movement.left !== undefined) {
                    if (container.scrollLeft >= (sticker_data.sticker_original_away_left - sticker_data.movement.left)) {
                        sticker.style.left =
                            sticker_data.sticker_original_left +
                                (container.scrollLeft - (sticker_data.sticker_original_away_left - sticker_data.movement.left)) +
                                'px';
                    }
                    else {
                        sticker.style.left = sticker_data.sticker_original_left + 'px';
                    }
                }
            }
        }
        else {
            // clean obsolete scrollable_data (as its relevant dom has been destroyed) //
            container_data.splice(i, 1);
        }
    }
}
export default stickElement;
