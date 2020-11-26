import React from 'react'

// options={[{value: 'profile', title: 'Профиль', content: 'Содержимое профиля'}, ... ]}
// defaultActiveKey - value выбранной вкладки
// className="tabs _level-1", "tabs _level-2"
// tabsName="identificator" - уникальный идентификатор NavTabs
// urlTabs={true} - вкладки запоминаются в url hash
// onChange={(e, value) => changeStateCard({tab: value})} - хендлер при клике на вкладку, передает название вкладки в качестве аргумента

export class NavTabs extends React.PureComponent {

    constructor(props) {
        super(props);
        this.navTabs = React.createRef();
    }

    state = {
        showTabs: {[location.hash.split('-')[1] || this.props.defaultActiveKey]: true}
    };

    changeState = obj => {
        this.setState(obj)
    };

    clickTabs = e => {
        const {tabsName, defaultActiveKey, urlTabs, onChange} = this.props;
        const {changeState} = this;
        const value = e.currentTarget.dataset.value;

        if (urlTabs) {
            const url = location.href.replace(/\/$/, "");
            const hash = $(e.currentTarget).attr("href");
            const newUrl = hash === "#" + tabsName + "-" + defaultActiveKey ? url.split("#")[0] : url.split("#")[0] + hash;
            history.replaceState(null, null, newUrl);
        }

        onChange && onChange(e, value);

        if (!(value in this.state.showTabs)) { // Если нет ключа
            changeState({
                showTabs: Object.assign({}, this.state.showTabs, {[value]: true})
            })
        }
    };

    componentDidMount() {
        $(this.navTabs.current).on('shown.bs.tab', 'a[data-toggle="tab"]', this.clickTabs)
    }

    render() {
        console.log('render NavTabs');
        const {showTabs} = this.state;
        const {tabsName, className, options, defaultActiveKey} = this.props;
        const navTabs = [], tabsContent = [];

        const hash = location.hash.split('-')[1]; // "#card-suitable" -> suitable
        const key = hash || defaultActiveKey;

        options.forEach(function (item, i) {
            if (!item) return;
            const id = tabsName + '-' + item.value;
            const showActive = key === item.value ? ' show active' : '';

            navTabs.push(
                <a key={i} className={"nav-item nav-link" + showActive}
                   href={'#' + id}
                   aria-controls={'nav-' + item.value}
                   data-value={item.value}
                   data-toggle="tab"
                   role="tab"
                   aria-selected="true">
                    {item.title}
                </a>
            );
            tabsContent.push(
                <div key={i} className={"tab-pane fade" + showActive} id={id} role="tabpanel">
                    {showTabs[item.value] ? item.content : ''}
                </div>
            )
        });

        return (
            //<div className={className} id={"nav-tabs-" + tabsName}>
            <div className={className}>
                <nav className="nav nav-tabs nav-fill scrollbar-none" ref={this.navTabs}>
                    {navTabs}
                </nav>
                <div className="tab-content">
                    {tabsContent}
                </div>
            </div>
        )
    }
}
