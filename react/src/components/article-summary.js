import React from 'react'

export class ArticleSummary extends React.Component {
    render() {
        return (
            <article>
                <h3><Link to={`/show/${this.props.code}`}>{this.props.title}</Link></h3>
                <h5>
                    {/* {{post.createdAt | date:'dd MMMM yyyy'}} */}
                    Posted on <time className="label label-primary">{this.props.createdAt}</time>
                    by <strong>{this.props.author}</strong>, {this.props.comments.length} comments
                </h5>
                {/* limitTo:100 ... */}
                <p>{this.props.content}</p>
            </article>
        );
    }
}