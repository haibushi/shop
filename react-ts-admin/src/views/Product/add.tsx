import { Modal, Form, Input, message, Button, Select } from "antd";
import { useState, useEffect } from "react";
import { addProduct, update, find } from "../../api/product";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { list } from "../../api/productCategory";
import BraftTextarea from "../../components/braftTextarea";
import Upload from "../../components/upload";
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
          setFilename(res.data.data?.product_url || "");
          let { link, sort, product_url } = res.data.data;
          form.setFieldsValue({ link, sort, product_url });
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
    const data = Object.assign({}, values, { product_url: filename });
    console.log(values);
    debugger;
    if (id) {
      update(id, data).then((res) => {
        message.success(res.data.message);
        if (res.data.code === 200) {
          handleCloseModal();
          getList && getList();
        }
      });
    } else {
      addProduct(data).then((res) => {
        message.success(res.data.message);
        if (res.data.code === 200) {
          handleCloseModal();
          getList && getList();
        }
      });
    }
  };

  const setCallback = (filename: string) => {
    setFilename(filename);
    form.setFieldsValue({ product_url: filename });
  };

  const handleChangeCategory = (value: number) => {
    console.log(`selected ${value}`);
  };

  const getTextAreaVal = (val: string) => {
    form.setFieldsValue({ product_desc: val });
  };
  const { Option } = Select;
  return (
    <Modal
      title="????????????"
      visible={isModalVisible}
      onOk={onFinish}
      width="800px"
      onCancel={handleCloseModal}
      cancelText="??????"
      okText="??????"
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="????????????"
          name="product_name"
          rules={[{ required: true, message: "?????????????????????!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="????????????"
          name="product_price"
          rules={[{ required: true, message: "?????????????????????!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="????????????"
          name="product_url"
          rules={[{ required: true, message: "???????????????" }]}
        >
          <Upload filename={filename} setCallback={setCallback} />
        </Form.Item>
        <Form.Item
          label="????????????"
          name="category_id"
          rules={[{ required: true, message: "?????????????????????!" }]}
        >
          <Select onChange={handleChangeCategory}>
            {categoryList.length > 0 &&
              categoryList.map((list) => {
                return (
                  <Option value={list.id} key={list.id}>
                    {list.name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>

        <Form.Item label="??????" name="sort">
          <Input />
        </Form.Item>
        <Form.Item label="??????" name="is_top">
          <Input />
        </Form.Item>
        <Form.Item label="?????????????????????" name="is_tuijian">
          <Input />
        </Form.Item>
        <Form.Item label="????????????" name="product_desc">
          <BraftTextarea getTextAreaVal={getTextAreaVal} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
