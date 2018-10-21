import React, { Component } from 'react';

class LessonCard extends Component {

    static defaultProps = {
        title: "Miguel Ángel",
        projectType: '@midudev',
        avatar: "http://gravatar.com/avatar/ab1d28e0c265caf52e6f22b4b1e2ac98",
        description: "This is an example of tweet mesage talking about code.",
        experienceType: "Best Practice",
        reportLink: "",
        score: 100
    };

    getGreenToRed(percent){
        const r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
        const g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
        return `#${r.toString(16)}${g.toString(16)}00`
    }

    render() {
        const {experienceType, description, title, projectType, score, reportLink } = this.props

        const textColor = this.getGreenToRed(score)

        return (
            <div className='column col-4'>
                <div className="card">
                    <div className="card-header">
                        <figure className="card-avatar avatar-lg">
                            <h1 style={{color: textColor}}>{score}</h1>
                        </figure>
                        <h4 className="card-title">{title}</h4>
                        <h6 className="card-meta">{experienceType} from a {projectType} project</h6>
                    </div>
                    <div className="card-body">
                    {description}
                    {reportLink && <span>&nbsp;<a href={reportLink} target="_blank">Link</a>.</span>}
                    </div>
                    <div className="card-footer">
                        <button className="cward-btn lnr lnr-bubble">
                        </button>
                        <button className="card-btn lnr lnr-heart">
                        </button>
                        <button className="card-btn lnr lnr-code">
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LessonCard;