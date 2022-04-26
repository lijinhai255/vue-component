import { FC, useEffect, useState } from 'react';
import { Modal, Table, message } from 'antd';
import { apiReportProjectDataList, apiReportGenerate } from '../../service';
interface ReportModalProps {
  monitoringReportVisible: boolean;
  changeMonitoringReportVisible: (type: boolean) => void;
  projectId: number;
}

const ReportModal: FC<ReportModalProps> = ({
  monitoringReportVisible,
  changeMonitoringReportVisible,
  projectId,
}) => {
  const [modalOkLoading, changeModalOkLoading] = useState<boolean>(false);
  const [projectDataList, changeProjectDataList] = useState<
    { id: string; startDate: string; endDate: string }[]
  >([]);
  const [disabled, changeDisAble] = useState(false);
  const [dataIdList, changeSelectedRowKeys] = useState<string[]>([]);
  const apiReportProjectDataListFn = async () => {
    await apiReportProjectDataList({ projectId }).then(({ data }) => {
      console.log(data.data);
      if (data.code === 200) {
        changeProjectDataList(data.data);
        if (data.data.length > 0) {
          changeDisAble(false);
        } else {
          changeDisAble(true);
        }
        // changeMonitoringReportVisible(true);
        return;
      }
      message.error(data.msg);
    });
  };
  // 生成监测报告
  const apiReportGenerateFn = async () => {
    changeModalOkLoading(true);

    await apiReportGenerate({
      projectId,
      dataIdList,
    }).then(async ({ data }) => {
      if (data.code === 200) {
        changeMonitoringReportVisible(false);
        changeModalOkLoading(false);
        changeSelectedRowKeys([]);
        message.success('监测报告生成成功');
        return;
      }
      await message.error(data.msg);
      changeModalOkLoading(false);
    });
  };
  useEffect(() => {
    if (monitoringReportVisible === true) {
      changeSelectedRowKeys([]);
      apiReportProjectDataListFn();
    }
  }, [monitoringReportVisible]);
  return (
    <Modal
      title={`生成监测报告`}
      visible={monitoringReportVisible}
      onCancel={() => {
        changeMonitoringReportVisible(false);
      }}
      maskClosable={false}
      width={800}
      onOk={async () => {
        apiReportGenerateFn();
      }}
      okButtonProps={{
        loading: modalOkLoading,
        disabled: disabled,
      }}
    >
      <Table
        dataSource={projectDataList}
        rowKey={(record: { id: string; startDate: string; endDate: string }) =>
          record.id
        }
        columns={[
          {
            title: '监测时间段',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (startDate: string, record: { endDate: string }) => {
              return `${startDate}~${record.endDate}`;
            },
          },
        ]}
        rowSelection={{
          onChange: dataIdList => {
            let arrSort = dataIdList.sort((a, b) => Number(a) - Number(b));
            let indexArr: number[] = [];
            let selectArr: string[] = [];
            changeSelectedRowKeys([]);
            arrSort.forEach(it => {
              let index = projectDataList.findIndex((item: { id: string }) => {
                return item.id === it;
              });
              indexArr.push(index);
            });
            indexArr.sort((a: number, b: number) => Number(a) - Number(b));
            projectDataList.forEach((item, index) => {
              if (
                indexArr[0] === index ||
                (indexArr[0] < index && index <= indexArr[indexArr.length - 1])
              ) {
                selectArr.push(item.id);
              }
            });
            changeSelectedRowKeys([...selectArr]);
          },
          selectedRowKeys: dataIdList,
        }}
      />
    </Modal>
  );
};

export default ReportModal;
