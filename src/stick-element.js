function scrollHandler(event)
{   
    for(let set_specs of event.target.StickElementData.specs_array)
    {
        // 从container上取回参数 //
        let { element, container, offset_limits, disabled } = set_specs;

        if(!disabled)
        {
            // 竖直方向 //
            if(offset_limits.top != null && container.scrollTop > offset_limits.top)
            {
                element.style.top = container.scrollTop - offset_limits.top + 'px';
            }
            else
            {
                element.style.top = 0 +'px';
            }

            // 水平方向 //
            if(offset_limits.left != null && container.scrollLeft > offset_limits.left)
            {
                element.style.left = container.scrollLeft - offset_limits.left + 'px';
            }
            else
            {
                element.style.left = 0 +'px';
            }
        }
    }
}

function stickElement(specs_input)
{
    // 验证入参 ------------------------------------------------------------------------------------


    // 设置变量 ------------------------------------------------------------------------------------
    
    let specs_default =
    {
        element: null,
        container: null,
        offset_limits:
        {
            top: null,
            bottom: null,
            left: null,
            right: null,
        },
        destroy: false,
        disabled: false,
    }
    
    let specs = Object.assign({}, specs_default, specs_input)
    specs.offset_limits = Object.assign({}, specs_default.offset_limits, specs_input.offset_limits)

    // 如果入参是string，用选择器获取元素；否则视为元素引用直接使用 //
    if(typeof(specs_input.element) == 'string')
    {
        specs.element = document.querySelector(specs_input.element)
    }
    else
    {
        specs.element = specs_input.element;
    }

    if(typeof(specs_input.container) == 'string')
    {
        specs.container = document.querySelector(specs_input.container)
    }
    else
    {
        specs.container = specs_input.container;
    }

    // 储存参数 ------------------------------------------------------------------------------------
    /*
        因为addEventListener中向具名函数传参8太行，所以曲线救国，把参数存到container元素上
    */
    let container = specs.container    // 别名引用

    // 是否移除 ------------------------------------------------------------------------------------
    // if(specs.destroy)
    // {
    //     container.removeEventListener
    //     (
    //         'scroll',
    //         scrollHandler
    //     );
    //     delete container.StickElementData;
    //     return;
    // }

    // 已启用 //
    if(container.hasOwnProperty('StickElementData'))
    {   
        // 更新配置 //
        let if_element_is_set = false

        for(let i in container.StickElementData.specs_array)
        {
            if(container.StickElementData.specs_array[i].element == specs.element)
            {
                container.StickElementData.specs_array[i] = Object.assign({}, specs)
                
                if_element_is_set = true
            }
        }
        // 添加配置 //
        if(!if_element_is_set)
        {
            container.StickElementData.specs_array.push(specs)
        }
    }
    // 首次启用 //
    else
    {
        container.StickElementData =
        {
            specs_array: [specs],
        }
    }

    // 设置监听 ------------------------------------------------------------------------------------
    container.addEventListener
    (
        'scroll',
        scrollHandler
    )
}



export default stickElement
