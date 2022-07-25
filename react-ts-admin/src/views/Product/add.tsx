import { Modal, Form, Input, Upload, message, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { addLunbo, update } from "../../api/lunbo";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { find } from "../../api/lunbo";
import { list } from "../../api/productCategory";
interface PropsType {
  isModalVisible: boolean;
  handleCloseModal: () => void;
  getList?: () => void;
  id: number;
}

interface CategoryType {
  id: number;
  name: string;
}
const Add = ({ isModalVisible, handleCloseModal, getList, id }: PropsType) => {
  const [form] = Form.useForm();
  let [filename, setFilename] = useState<string>("");
  let [loading, setLoading] = useState<boolean>(false);
  let [categoryList, setCategoryList] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (isModalVisible) {
      form.resetFields();
      setFilename("");
    }
    if (id) {
      find({ id }).then((res) => {
        if (res.data.code === 200) {
          setFilename(res.data.data?.photo || "");
          let { link, sort, photo } = res.data.data;
          form.setFieldsValue({ link, sort, photo });
        }
      });
    }
  }, [isModalVisible, id, form]);

  useEffect(() => {
    list().then((res) => {
      setCategoryList(res.data.data);
    });
  }, []);
  const onFinish = async () => {
    const values = await form.validateFields();
    const data = Object.assign({}, values, { photo: filename });
    if (id) {
      update(id, data).then((res) => {
        message.success(res.data.message);
        if (res.data.code === 200) {
          handleCloseModal();
          getList && getList();
        }
      });
    } else {
      addLunbo(data).then((res) => {
        message.success(res.data.message);
        if (res.data.code === 200) {
          handleCloseModal();
          getList && getList();
        }
      });
    }
  };
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
      setLoading(true);
    }
    if (info.file.status === "done") {
      setLoading(false);
      setFilename(info.file.response.data);
      message.success("文件上传成功！");
    } else if (info.file.status === "error") {
      message.error("文件上传失败");
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChangeCategory = (value: string) => {
    console.log(`selected ${value}`);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const { Option } = Select;
  return (
    <Modal
      title="添加商品"
      visible={isModalVisible}
      onOk={onFinish}
      onCancel={handleCloseModal}
      cancelText="取消"
      okText="确认"
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="商品名称"
          name="product_name"
          rules={[{ required: true, message: "请输入商品名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="商品价格"
          name="product_priced"
          rules={[{ required: true, message: "请输入商品价格!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="商品图片"
          name="photo"
          rules={[{ required: true, message: "请上传图片" }]}
        >
          <Upload
            name="file"
            action="http://localhost:8080/tp5/public/api/index/uploadFile"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {filename ? (
              <img src={filename} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label="商品分类"
          name="product_category"
          rules={[{ required: true, message: "请选择商品分类!" }]}
        >
          <Select onChange={handleChangeCategory}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
        <Form.Item label="排序" name="sort">
          <Input />
        </Form.Item>
        <Form.Item label="是否推荐到首页" name="sort">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
