const mysql    = require('mysql');
const dbConfig = require('../config/db_config');


const db =  mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
}); 

//데이터베이스 생성!
//CREATE SCHEMA  HKNS: 

//견적요청리스트 테이블 생성 
const create_reqQuoteList = `
CREATE TABLE REQ_QUOTE_LIST(
              REQ_ID          INT NOT NULL
            , CUST_NM     varchar(20)  not null
            , TEL_NO      varchar(20)  not null
            , REQ_DATE    varchar(20) 
            , EMAIL_ID    varchar(160)
            , EMAIL_DOWN  varchar(200)
            , UPJONG      varchar(20) 
            , BOILER_TYPE varchar(20) 
            , POST_CODE   varchar(6)  
            , ADDR        varchar(200) 
            , DTL_ADDR    varchar(300) 
            , EXT_ADDR    varchar(300) 
            , DESCR       varchar(1000) 
            , CUST_TYPE   varchar(20)
            , CREATED_DT DATETIME not null default now()
            , primary key(REQ_ID)
         )
         comment = '견적요청리스트'
         default charset = utf8
         engine=InnoDB `;

//첨부파일 테이블 생성 
const create_reqFileList = `
CREATE TABLE ATCH_FILE_LIST(
              SEQ                     INT NOT NULL AUTO_INCREMENT
            , FILE_SEQ            INT  NOT NULL
            , REQ_ID                INT NOT NULL
            , ORG_FILE_NM    varchar(200)  
            , STR_FILE_NM     varchar(200) 
            , FILE_PATH          varchar(50)
            , FILE_SIZE           int(15) 
            , FILE_TYPE          varchar(50)
            , FILE_DESCR       varchar(500) 
            , USE_YN              varchar(1)  
            , CREATED_DT    DATETIME not null default now()
            , primary key(SEQ)
         )
         comment = '첨부파일리스트'
         default charset = utf8
         engine=InnoDB `;

//문자발송 테이블 생성 
const create_sendMsgList = `
CREATE TABLE SEND_MSG_LIST(
              SEQ          INT NOT NULL AUTO_INCREMENT
            , REQ_ID       INT NOT NULL
            , REQ_DATE     varchar(20)  
            , TO_TELNO     varchar(15) 
            , FROM_TELNO   varchar(15)
            , SUBJECT      varchar(200) 
            , CONTENTS     varchar(2000)
            , MSG_TYPE     varchar(20) 
            , SEND_YN      varchar(2)  
            , SEND_DT      DATETIME
           , ERR_MSG   varchar(2000)
            , CREATED_DT   DATETIME not null default now()
            , primary key(SEQ)
         )
         comment = '문자발송리스트'
         default charset = utf8
         engine=InnoDB `;


db.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
	
   //dropTable("REQ_QUOTE_LIST");
  //dropTable("ATCH_FILE_LIST");
  //dropTable("SEND_MSG_LIST");
  
  //견적요청 테이블  생성
  createTable("REQ_QUOTE_LIST", create_reqQuoteList);
  
  //첨부파일 테이블  생성
  createTable("ATCH_FILE_LIST", create_reqFileList);
  
  //문자발송 테이블  생성
  createTable("SEND_MSG_LIST", create_sendMsgList);

});


/*
 * 테이블 생성
 */
function createTable(tableNm , sql){
  
  const existSql = `SHOW TABLES LIKE '${tableNm}'`;
  db.query(existSql, function (err, result) {
    if (err) throw err;

    if(result.length > 0){
        console.log(`[Create] ${tableNm} 테이블이 이미 생성되어있습니다.`);

    }else{
       console.log(`[Create Start] ${tableNm} 테이블을 생성을 시작 합니다.`);

       db.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`[Create E n d] ${tableNm} 테이블이 생성이 완료 되었습니다.`);
       });
    }
  });
  
}


/*
 * 테이블 삭제
 */
function dropTable(tableNm){
  
  const existSql = `SHOW TABLES LIKE '${tableNm}'`;
  db.query(existSql, function (err, result) {
    if (err) throw err;

    if(result.length > 0){
      
        const dropSql = `DROP TABLE ${tableNm}`;
        db.query(dropSql, function (err, result) {
          if (err) throw err;
          console.log(`[Delete] ${tableNm} 테이블이 삭제되었습니다.`);
        });
    }else{
      console.log(`[Delete] ${tableNm} 테이블이 없습니다.`);
    }
  });
}
  

// /*
//  * 테이블 존재 확인 
//  */
// function existTable(tableNm){
//   const existSql = `SHOW TABLES LIKE '${tableNm}'`;
//   db.query(existSql, function (err, result) {
//     if (err) throw err;

//     if(result.length > 0){
//         console.log(`[Already Exists] ${tableNm} 테이블이 생성되어있습니다.`);
//         return false; 
//     }else{
//         console.log(`[NOT Exist] ${tableNm} 테이블이 없습니다.`);
//         return true; 
//     }
//   });
// }
  
