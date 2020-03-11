


/**
* @description
* Vanilla Javascript Tooltip Implementation
* 
* @class
*/


Tooltip = function() {

    document.body.addEventListener('mouseover', function(e) {
        if (!e.target.hasAttribute('data-tooltip')) return;

        var tooltip = document.createElement('div');
        tooltip.className = 'supplyframe-tooltip';
        tooltip.innerHTML = 'Loading...';

        var url = e.target.getAttribute('data-tooltip');

        AJAX.get(url, function(user) {
            tooltip.innerHTML = '';
            tooltip.appendChild(renderTooltip(user));
        });

        document.body.appendChild(tooltip);

        calculatePosition(e.target, tooltip);
    });

    document.body.addEventListener('mouseout', function(e) {
        if(e.target.hasAttribute('data-tooltip')) {
            document.body.removeChild(document.querySelector('.supplyframe-tooltip'));
        }
    });

    function renderTooltip(user) {
        var div = document.createElement('div');
        for(key in user) {
            var span = document.createElement('span');
            var br = document.createElement('br');
            span.innerHTML = key + ': ' + user[key];
            div.appendChild(span);
            div.appendChild(br);
        }

        return div;
    }

    function calculatePosition(parent, tooltip) {
        var parentCoordinate = parent.getBoundingClientRect(),
            left,
            top;

        left = parentCoordinate.right + 10;
        top = (parentCoordinate.top + parentCoordinate.bottom) / 2;

        tooltip.style.left = left + 'px';
        tooltip.style.top  = top + window.pageYOffset + 'px';
    }
}
