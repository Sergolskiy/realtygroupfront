// Инициализация ленивой загрузки
// $.lazyLoadXT.autoInit = false;
// $.extend($.lazyLoadXT, {
//     // edgeY:  200,
//     srcAttr: 'data-lazy',
//     selector: 'img[data-lazy]',
//     blankImage: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
//     autoInit: true
// });

// Инициализация tooltip от Bootstrap
$('body').tooltip({
    selector: "[data-toggle='tooltip']",
    delay: {'show': 500, 'hide': 100},
    placement: 'auto'
});


const selectStyleDefault = {
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#6197B7' : base.backgroundColor
    }),
    control: (base, state) => {
        // console.log(base, state);
        return {
            ...base,
            borderColor: state.isFocused ? '#6197B7' : base.borderColor,
            boxShadow: state.isFocused ? '0 0 0 1px #6197B7' : base.boxShadow,
            '&:hover': {
                // ...base['&:hover'],
                borderColor: state.isFocused ? '#6197B7' : base['&:hover']['borderColor']
            }
        }
    }
};

const selectStyleMenuList = {
    menuList: (base) => ({
        ...base,
        height: '150px'
    })
};