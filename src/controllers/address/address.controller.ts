import { Request, Response, query } from 'express';
import { dataUserTK } from '../../libs/data_user';
import { AddressModel } from '../../models/address/address.model';
import { DataAddressSQL, GetAddressByUser } from '../../types/address/address';

export const getAddressByUser = async (req: Request, res: Response) => {
  try {
    const dataUser = await dataUserTK(req);
    if (dataUser) {
      const dataSQL: GetAddressByUser = {
        code_user: dataUser.payload.code_user,
      };
      await AddressModel.getAddressByUserModel(dataSQL, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        } else {
          if (result) {
            res.json({
              data: result.rows,
            });
          }
        }
      });
    }
  } catch (err) {
    res.json({
      error: 'Error',
    });
  }
};

export const addAddressByUser = async (req: Request<any, any, DataAddressSQL>, res: Response) => {
  try {
    const data_user = dataUserTK(req);
    if (data_user) {
      const dataSQL = req.body.data;
      dataSQL.code_user = data_user?.payload.code_user;
      const dataCheck = await AddressModel.checkPhoneAddressIsEmptyByUser({
        code_user: dataSQL.code_user,
        phone: dataSQL.phone,
      });
      const dataCountAddress = await AddressModel.checkCountAddressByUser({
        code_user: dataSQL.code_user,
      });
      const dataResult = {
        data: dataSQL,
      };
      if (dataSQL.status) {
        const dataUpdateStatus = {
          code_user: dataSQL.code_user,
          status: false,
          code_address: dataSQL.code_address,
        };
        const dataUpdate = await AddressModel.updateStatusAddressByUserModel(dataUpdateStatus);
        if (Number(dataCountAddress.rows[0].count) < 6) {
          if (Number(dataCheck.rows[0].count) === 0) {
            await AddressModel.addAddressByUserModel({ item: dataResult }, (err, result) => {
              if (err) {
                res.json({
                  error: err,
                });
              } else {
                if (result) {
                  if (result.rowCount > 0) {
                    res.json({
                      message: 'Thêm thành công ',
                    });
                  } else {
                    res.json({
                      message: 'Thêm không thành công ',
                    });
                  }
                }
              }
            });
          } else {
            res.status(400).json({
              error: 'Số điện thoại đã tồn tại',
            });
          }
        } else {
          res.status(400).json({
            error: 'Cập nhật không thành công ',
          });
        }
      } else {
        if (Number(dataCountAddress.rows[0].count) < 6) {
          if (Number(dataCheck.rows[0].count) === 0) {
            await AddressModel.addAddressByUserModel({ item: dataResult }, (err, result) => {
              if (err) {
                res.json({
                  error: err,
                });
              } else {
                if (result) {
                  if (result.rowCount > 0) {
                    res.json({
                      message: 'Thêm thành công ',
                    });
                  } else {
                    res.json({
                      message: 'Thêm không thành công ',
                    });
                  }
                }
              }
            });
          } else {
            res.status(400).json({
              error: 'Số điện thoại đã tồn tại',
            });
          }
        } else {
          res.status(400).json({
            error: 'Số lượng địa chỉ đã có tối đa - không thể thêm mơi',
          });
        }
      }
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const getDetailAddressUserByCode = async (req: Request, res: Response) => {
  try {
    const data_user = dataUserTK(req);
    const dataSQL = {
      code_user: data_user?.payload.code_user,
      code_address: (req.query.code_address as string) || '',
    };
    await AddressModel.getDetailAddressUserByCode(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rows.length > 0) {
            res.json({
              data: result.rows[0],
            });
          } else {
            res.status(400).json({
              message: 'Không tồn tại địa chỉ',
            });
          }
        }
      }
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
};

export const removeAddressUserByCode = async (req: Request, res: Response) => {
  try {
    const { code_address } = req.query;
    const data_user = await dataUserTK(req);
    const dataSQL = {
      code_address: code_address as string,
      code_user: data_user?.payload.code_user,
    };
    await AddressModel.removeAddressUserByCodeModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          res.json({
            message: 'SUCCESS REMOVE ADDRESS',
          });
        }
      }
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const updateAddressUserByCode = async (req: Request, res: Response) => {
  try {
    const data_user = dataUserTK(req);
    const dataSQL: DataAddressSQL = req.body;
    dataSQL.data.code_user = data_user?.payload.code_user;
    if (dataSQL.data.status) {
      const dataUpdateStatus = {
        code_user: dataSQL.data.code_user,
        status: false,
        code_address: dataSQL.data.code_address,
      };
      await AddressModel.updateStatusAddressByUserModel(dataUpdateStatus);
    }
    await AddressModel.updateAddressUserByCodeModel(dataSQL, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        if (result) {
          if (result.rowCount > 0) {
            res.json({
              code_address: dataSQL.data.code_address,
              message: 'Cập nhật địa chỉ thành công ',
            });
          } else {
            res.status(400).json({
              code_address: dataSQL.data.code_address,
              message: 'Không thể cập nhật đỉa chỉ',
            });
          }
        }
      }
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
