;(function ($) {
    $(function () {
        var header = document.getElementById('main-header');
        var container = header && header.querySelector('.logo_container');
        if (!container || !dslLogoAttr.dlsLogo || container.classList.contains('dls-switcher')) return;
        var main = container.querySelector('a');
        if (!main) return;
        var originalTabindex = main.getAttribute('tabindex');
        var ready = false;
        var alternate = $('<a>', { 'class': 'second-logo', href: dslLogoAttr.homeUrl.trim(), 'aria-hidden': 'true', tabindex: '-1' });
        var image = $('<img>', { src: dslLogoAttr.dlsLogo.trim(), alt: dslLogoAttr.imgAlt.trim(), id: 'logo', 'data-height-percentage': dslLogoAttr.logoHeight, loading: 'eager' });
        main.classList.add('main-logo');
        container.classList.add('dls-switcher');
        alternate.append($('<span>', { 'class': 'logo_helper' }), document.createTextNode(' '), image).appendTo(container);

        function update() {
            var switched = ready && header.classList.contains('et-fixed-header');
            container.classList.toggle('dls-show-alternate', switched);
            main.setAttribute('aria-hidden', switched ? 'true' : 'false');
            if (switched) main.setAttribute('tabindex', '-1');
            else if (originalTabindex === null) main.removeAttribute('tabindex');
            else main.setAttribute('tabindex', originalTabindex);
            alternate.attr('aria-hidden', switched ? 'false' : 'true');
            if (switched) alternate.removeAttr('tabindex');
            else alternate.attr('tabindex', '-1');
        }
        function loaded() {
            if (!image[0].naturalWidth) return;
            var decoded = image[0].decode ? image[0].decode() : Promise.resolve();
            decoded.catch(function () {}).then(function () { ready = true; update(); });
        }
        image.on('load', loaded);
        if (image[0].complete) loaded();
        new MutationObserver(update).observe(header, { attributes: true, attributeFilter: ['class'] });
        update();
    });
})(jQuery);
