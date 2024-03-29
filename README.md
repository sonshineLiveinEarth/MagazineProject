![](https://velog.velcdn.com/images/yunju/post/cd0c24d7-91a5-4ea0-a8da-35a5dc04c73d/image.png)

## 프로젝트 개요

일정 : 2022.06.03 ~ 2022.06.09 <br/>
사용 기술 : React, redux-toolkit, styled-components, firebase
<div>
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC.svg?&style=for-the-badge&logo=Visual Studio Code&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"> 
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> 
</div>
<div>
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> 
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white"> 	
</div>
<div>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=redux&logoColor=white"> 
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=redux&logoColor=white"> 
</div>
<br/><br/>

## 기능구현
1. 회원가입 페이지
     - [x] 이메일 형식 체크, 비밀번호 체크<br/>
2. 로그인 페이지
     - [x] 이메일, 패스워드 미기입 시 로그인 버튼 비활성화<br/><br/>
    
3. 메인 페이지(게시글 목록 페이지)<br/>
    - [x] 게시글 목록 노출<br/>
    - [x] 게시글 하나는 작성자, 작성 시간, 이미지 미리보기, 텍스트 내용으로 구성<br/>
    - [x] 게시글 하나를 클릭 시, 게시글 상세 페이지로 이동<br/><br/>
4. 글 작성 페이지<br/>
    - [x] 레이아웃 선택 버튼<br/>
        1. 3가지 레이아웃 중 선택하도록 한다.<br/>
            - 이미지가 오른편에, 텍스트는 왼편에 위치한 레이아웃<br/>
            - 이미지가 왼편에, 텍스트는 오른편에 위치한 레이아웃<br/>
            - 텍스트가 위에, 이미지는 아래에 위치한 레이아웃<br/>
        2. 레이아웃 선택 시, 게시글 레이아웃(모양새)대로 보이도록 한다.<br/>
        3. **텍스트, 이미지 중 입력 안된 게 있다면 게시글 작성 버튼 비활성화**<br/>
        4. 작성 완료 시 메인 페이지로 이동<br/><br/>
5. 게시글 상세 페이지<br/>
   - [x] 게시글 레이아웃에 맞춰 이미지, 텍스트 위치 조절해서 노출<br/>
