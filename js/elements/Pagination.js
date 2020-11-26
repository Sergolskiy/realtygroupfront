import React from 'react'

export class Pagination extends React.PureComponent {

    paginationPage = (e, page) => {
        e.preventDefault();
        this.props.load(page) // Функция загрузки данных с сервера с новыми параметрами пагинации
    };

    render() {
        const {
            last_page, // Сколько всего страниц
            current_page // Текущая страница
        } = this.props;

        if (!(last_page > 1)) return '';

        const pagination_btns = [];
        for (let i = 0; i < last_page; i++) {
            pagination_btns.push(
                <li key={i} className={"page-item" + (current_page === i + 1 ? " active" : "")}>
                    <a className="page-link" href="" onClick={e => this.paginationPage(e, i + 1)}>
                        {i + 1}
                    </a>
                </li>
            )
        }

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={"page-item" + (current_page === 1 ? " disabled" : "")}>
                        <a className="page-link" aria-label="Previous" onClick={e => this.paginationPage(e, current_page - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pagination_btns}
                    <li className={"page-item" + (current_page === last_page ? " disabled" : "")}>
                        <a className="page-link" aria-label="Next" onClick={e => this.paginationPage(e, current_page + 1)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}