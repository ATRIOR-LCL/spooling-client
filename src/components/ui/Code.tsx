import React from "react";
import '../../assets/css/code.less';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeProps {
    code: string;
}

export default class Code extends React.Component<CodeProps> {
    constructor(props: CodeProps) {
        super(props);
    }
    render(): React.ReactNode {
        return (
            <div className="code">
                <div className="code-face">
                    <SyntaxHighlighter language="cpp" style={solarizedlight} customStyle={{ backgroundColor: 'transparent', padding: '0.5rem', borderRadius: '0.5rem' }}>
                        {this.props.code}
                    </SyntaxHighlighter>
                </div>
            </div>
        )
    }
}