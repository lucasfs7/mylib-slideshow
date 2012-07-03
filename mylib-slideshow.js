var API = API || {};
var myLibSlideshow;

(function()
{
    myLibSlideshow = function(opt)
    {
        /* opt = 
         * {
         *      slideshowContainer: [html obj or element id - REQUIRED],
         *      slideshowList: [html obj colection or tag name of items elements - REQUIRED],
         *      slideshowTransitionDuration: [the transition duration in ms - OPTIONAL],
         *      slideshowWaitingDuration: [the waiting between 1 item and the nex item - OPTIONAL],
         *      slideshowStartOn: [int - the position of the active item - OPTIONAL],
         *      slideshowNavContainer: [html obj or element id - OPTIONAL],
         *      slideshowNavList:[html obj colection or tag name of items elements - REQUIRED if the slideshowNavContainer is set],
         *      slideshowAutoStart: [true or false to auto start de slideshow]
         * } */

        //verifica se veio um object ou uma string e instancia o elemento
        var instantiateElem = function(elem)
        {
            if(elem)
            {
                if(typeof(elem).toLowerCase() == "string")
                {
                    return API.getEBI(elem);
                }
                else if(typeof(elem).toLowerCase() == "object")
                {
                    return elem;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        };
        
        //verifica se é um array de objects ou uma string com o nome da tag e retorna a lista com os elementos
        var getListElems = function(elems, container)
        {
            if(elems)
            {
                if(typeof(elems).toLowerCase() == "object" && elems.length && elems.length > 0)
                {
                    return elems;
                }
                else if(typeof(elems).toLowerCase() == "string")
                {
                    if(container)
                    {
                        return API.getEBTN(elems, container);
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        };
        
        //pega as opções que o usuário passou no objeto opt e declara as vars necessárias para o carousel
        var opt = opt || {};
        var container = instantiateElem(opt.slideshowContainer);
        var list = getListElems(opt.slideshowList, container);
        var transitionDuration = opt.slideshowTransitionDuration || 500;
        var waitingDuration = opt.waitingDuration || 5000;
        var transitionInterval;
        var currentItem = null;
        var navContainer = null;
        var autoStart = true;
        var navList;

        if(opt.slideshowAutoStart)
        {
            autoStart = opt.slideshowAutoStart;
        }

        if(opt.slideshowNavContainer && opt.slideshowNavList)
        {
           navContainer = instantiateElem(opt.slideshowNavContainer);
           navList = getListElems(opt.slideshowNavList, navContainer);
        }
        
        if(opt.slideshowStartOn)
        {
            currentItem = opt.slideshowStartOn;
        }
        else
        {
            currentItem = 0;
        }
        
        //se o container não existir, nem a list ou não tiver nenhum item retorna false
        if(!container || !list || list.length <= 0)
        {
            return false;
        }
        
        //efeito de transição
        var changeItem = function(newItem)
        {
            if(newItem == list.length)
            {
                newItem = 0;           
            }

            if(newItem == currentItem)
            {
                return;
            }

            API.showElement(list[currentItem], false, { effects:API.effects.fade, duration:transitionDuration });
            API.showElement(list[newItem], true, { effects:API.effects.fade, duration:transitionDuration });
            
            if(navContainer && navList && navList.length > 0)
            {
                if(navList[currentItem])
                {
                    API.removeClass(navList[currentItem], "ativo");
                }
                if(navList[newItem])
                {
                    API.addClass(navList[newItem], "ativo");
                }
            }

            setTimeout(function()
            {
                API.removeClass(list[currentItem], "ativo");
                API.addClass(list[newItem], "ativo");
                currentItem = newItem;
            }, transitionDuration);
        }

        var startAutoChange = function()
        {
            changeItem(currentItem + 1);
        };

        if(navContainer && navList && navList.length > 0)
        {
            for(var i = 0; i < navList.length; i++)
            {
                (function(i)
                {
                    API.attachListener(navList[i], "click", function(e)
                    {
                        API.cancelDefault(e);
                        if(transitionInterval)
                        {
                            clearInterval(transitionInterval);
                        }
                        API.removeClass(navList[currentItem], "ativo");
                        changeItem(i);
                        API.addClass(navList[i], "ativo");
                        if(autoStart)
                        {
                            transitionInterval = setInterval(startAutoChange, waitingDuration);
                        }
                    });
                })(i);
            }
        }

        if(autoStart)
        {
            transitionInterval = setInterval(startAutoChange, waitingDuration);
        }
    };
})();
