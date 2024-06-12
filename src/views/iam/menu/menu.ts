import {FormRules} from "naive-ui";

export interface MenuCommand {
    id?: number;
    name: string;
    pid: number;
    applicationId: number;
    code: string;
    status: number;
    component?: string;
    component2?: string;
    hideChildren?: boolean;
    path?: string;
    path2?: string;
    type?: number;
    icon?: string;
    sequence?: number;
}

export const MenuFormRules: FormRules = {
    applicationId: {
        required: true,
        message: '请选择应用',
        trigger: 'blur',
    },
    type: {
        required: true,
        message: '请选择类型',
        trigger: 'blur',
        type: "number"
    },
    name: {
        required: true,
        message: '请输入标题',
        trigger: 'blur',
        type: "string"
    },
    code: {
        required: true,
        message: '请输入编码',
        trigger: 'blur',
        type: "string"
    },
    path2: {
        required: false,
        message: '请输入路径',
        trigger: 'blur',
        type: "string"
    },
    component2: {
        required: false,
        message: '请输入组件',
        trigger: 'blur',
        type: "string"
    },
};
