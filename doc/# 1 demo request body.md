# 1 demo request body
## 1.1 审批流申请
**Request**

type: 0国内, 1国外
```
PUT /approval/apply
headers.Authorization: "10001_token"
{
    "title": "2022年6月商汤超算中心市场部宴会",
    "type": 0,
    "content": "我司受邀出席商汤超算中心于2022年6月18日，在上海自贸区临港新片区举办的合作单位宴会.
    申请6月16日至6月19日出差上海, 申请出差经费3万元",
    "money": 30000,
    "useOfMoney": "交通, 住宿, 餐饮, 大客户关系维护支出"
}
```
**Response**
```
{
    code: 0,
    data: {
        id: "12345"
    }
}
```

approval； 
id: 12345
code: abcd

## 1.2 审批流详情
**Request**
```
GET /approval/detail/{id}
headers.Authorization: "10001_token"
```
**Response**
{
    code: 0,
    data:{
        "id": "12345",
        "code": "abcd",
        "title": "2022年6月商汤超算中心市场部宴会",
        "type": 0,
        "content": "我司受邀出席商汤超算中心于2022年6月18日，在上海自贸区临港新片区举办的合作单位宴会.
        申请6月16日至6月19日出差上海, 申请出差经费3万元",
        "money": 30000,
        "useOfMoney": "交通, 住宿, 餐饮, 大客户关系维护支出",
        "applicant": {
            "id": "dcba",
            "code": "10001",
            "name": "张三"
        },
        "approver": {
            "id": "zyxw",
            "code": "20001",
            "name": "李四"
        },
        "comment": null
        "status": 0
    }
}

## 1.3 审批流审批
action: 1通过, 2驳回  
**Request**
```
POST /approval/{id}
headers.Authorization: "20001_token"
{
    id: "12345",
    comment: "同意",
    action: 1
}
```
**Response**
```
{
    code: 0
}
```

## 1.4 审批流列表
**Request**
```
GET /approval/list?page=1&limit=10
headers.Authorization: "10001_token"
```
**Response**
```
{
    code:0,
    data: [
        {
            "id": "12345",
            "code": "abcd",
            "title": "2022年6月商汤超算中心市场部宴会",
            "type": 0,
            "content": "我司受邀出席商汤超算中心于2022年6月18日，在上海自贸区临港新片区举办的合作单位宴会.
            申请6月16日至6月19日出差上海, 申请出差经费3万元",
            "money": 30000,
            "useOfMoney": "交通, 住宿, 餐饮, 大客户关系维护支出",
             "applicant": {
            "id": "dcba",
            "code": "10001",
            "name": "张三"
        },
        "approver": {
            "id": "zyxw",
            "code": "20001",
            "name": "李四"
        },
            "comment": null,
            "status":0
        },
        {
            "id": "12346",
            "code": "xzy",
            "title": "2022年特斯拉ModelY上海新品发布会",
            "type": 0,
            "content": "我司受邀出席特斯拉于2022年5月10日，在上海特斯拉超级工厂举办的ModelY新车下限发布会.申请5月7日至5月11日出差上海, 申请出差经费3万元",
            "money": 30000,
            "useOfMoney": "交通, 住宿, 餐饮, 大客户关系维护支出",
             "applicant": {
            "id": "dcba",
            "code": "10001",
            "name": "张三"
        },
        "approver": {
            "id": "zyxw",
            "code": "20001",
            "name": "李四"
        },
            "comment": "同意",
            "status": 1
        }
    ]
}
```

# 2 用户 #
## 2.1 注册用户
**Request**
```
PUT /user
{
    name:"张三",
    department:"marketing",
    code:"10001",
    position:"crew",
    password:"12345"
}
```
**Response**
```
{
    code:0,
    data: {
        id: "dcba"
    }
}
```
## 2.2 用户登录
**Request**
```
POST /user/login
{
    code:"10001",
    password:"12345"
}
```
**Response**
```
{
    code:0,
    data: {
        token: "10001_token"
    }
}