import React from 'react'
import PropTypes from "prop-types";

export class Cards_td_description_comment extends React.PureComponent {
    render() {
        console.log('render Cards_td_description_comment');
        const {description, comment} = this.props;

        const comments_arr = json_parse(comment) || [];
        const last_comment_obj = comments_arr[comments_arr.length - 1] || {};
        const last_comment = last_comment_obj.post + '<br/>' + moment(last_comment_obj.created_at).format("DD MMMM YYYY, HH:mm");

        return <td>
            {
                description &&
                <i className="mdi mdi-information-outline fs22 mr-1" title={description}
                   data-toggle="tooltip"/>
            }
            {
                comments_arr.length > 0 &&
                <i className="mdi mdi-message-text-outline fs22" title={last_comment}
                   data-toggle="tooltip" data-html="true"/>
            }
        </td>
    }
}


Cards_td_description_comment.propTypes = {
    description: PropTypes.string,
    comment: PropTypes.string
};