import React from "react";
import '../../assets/css/code.less';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from "axios";


interface CodeProps {
    code: string;
    color: boolean;
    teamName: string;
    fileName: string;
    taskId?: number;
    closeCode: () => void;
}

export default class Code extends React.Component<CodeProps> {
    constructor(props: CodeProps) {
        super(props);
    }

    private downloadCode = async () => {
        const { taskId } = this.props;
        if (!taskId) {
            console.error("Task ID is not provided.");
            return;
        }

        try {
            const res = await axios.post('/api/download_file', { id: taskId }, {
                responseType: 'blob'
            });

            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            const fileName = this.props.fileName.split('.');
            a.href = url;
            a.download = `${fileName[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Failed to download the file.", err);
        }
    };


    render(): React.ReactNode {
        return (
            <div className="code">
                <div className="code-team">
                    <p>TeamName:</p>
                    <p>{this.props.teamName}</p>
                </div>
                <div className="code-preview">
                    Code Preview 🐣
                </div>
                <button className="code-close" onClick={this.props.closeCode}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#fff"><path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" /></svg>
                </button>
                <button className="code-download" onClick={this.downloadCode}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#fff"><path d="M480-315.33 284.67-510.67l47.33-48L446.67-444v-356h66.66v356L628-558.67l47.33 48L480-315.33ZM226.67-160q-27 0-46.84-19.83Q160-199.67 160-226.67V-362h66.67v135.33h506.66V-362H800v135.33q0 27-19.83 46.84Q760.33-160 733.33-160H226.67Z" /></svg>
                </button>
                <div className="code-face">
                    {
                        this.props.color ? (
                            <SyntaxHighlighter language="cpp" style={solarizedlight} customStyle={{ backgroundColor: 'transparent', padding: '0.5rem', borderRadius: '0.5rem' }} showLineNumbers={true}>
                                {this.props.code}
                            </SyntaxHighlighter>
                        ) : (
                            // 不传递 language 就不进行代码高亮
                            <SyntaxHighlighter style={solarizedlight} customStyle={{ backgroundColor: 'transparent', padding: '0.5rem', borderRadius: '0.5rem' }} showLineNumbers={true}>
                                {this.props.code}
                            </SyntaxHighlighter>
                        )
                    }
                </div>
            </div>
        )
    }
}