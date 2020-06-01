const mysql    = require('mysql');
const dbConfig = require('../config/db_config');


const db =  mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
}); 

//데이터베이스 생성!
//CREATE SCHEMA  CHAT: 

//프로젝트리스트 테이블 생성 
const create_projectList = `
CREATE TABLE PROJECT_LIST(
              PRJ_ID          INT NOT NULL AUTO_INCREMENT
            , PRJ_NM     varchar(20)   not null   
           , PRJ_DESC         varchar(1000) 
            , CREATED_DT DATETIME not null default now()
            , primary key(PRJ_ID)
         )
         comment = '프로젝트 리스트'
         default charset = utf8
         engine=InnoDB `;

const create_chatList = `
CREATE TABLE CHAT_LIST(
              CHAT_ID                     INT NOT NULL AUTO_INCREMENT
            , PRJ_ID            INT  NOT NULL
            , PROF_ID                INT NOT NULL
           , CHAT_SEQ           varchar(10)
            , CHAT_TYPE    varchar(15)  
            , CHAT_MSG     varchar(2000) 
            , CREATED_DT    DATETIME not null default now()
            , primary key(CHAT_ID)
         )
         comment = '채팅리스트'
         default charset = utf8
         engine=InnoDB `;

//프로필리스트 테이블 생성 
const create_profList = `
CREATE TABLE PROF_LIST(
              PROF_ID   INT NOT NULL AUTO_INCREMENT
            , PRJ_ID       INT NOT NULL
            , PROF_NM   varchar(100)
            , POSITION     varchar(3) 
            , FILE_PATH          varchar(500)
            , CREATED_DT   DATETIME not null default now()
            , primary key(PROF_ID)
         )
         comment = '프로필리스트'
         default charset = utf8
         engine=InnoDB `;

db.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
	
  //dropTable("PROJECT_LIST");
  //dropTable("ATCH_FILE_LIST");
  //dropTable("SEND_MSG_LIST");
  
  //견적요청 테이블  생성
  createTable("PROJECT_LIST", create_projectList);
  
  //첨부파일 테이블  생성
  createTable("CHAT_LIST", create_chatList);
  
  //문자발송 테이블  생성
  createTable("PROF_LIST", create_profList);

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
  
