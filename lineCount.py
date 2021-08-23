import os
import sys
import os.path


def count_file_lines(file_path):#计算一个文件里面有多少行代码
    line_count = 0
    flag =True
    encoding_type=""
   #由于编码分UTF-8，和gbk,为了在统计的时候不报编码的错误，做如下操作
    try:
        fp = open(file_path,"r",encoding="utf-8")
        encoding_type="utf-8"
        fp.readline()
        #print("执行try")  
        fp.close()
    except UnicodeDecodeError:
        encoding_type="gbk"
        #print("执行except")
    with open(file_path,"r",encoding=encoding_type) as fp:
        for line in fp:             
            if line.strip() == "":
                continue
            else:
                if line.strip().endswith("'''") and flag == False:#不统计注释
                    flag = True
                    continue
                if line.strip().endswith('"""') and flag == False:#不统计注释
                    flag = True
                    continue
                if flag == False:
                    continue
                if line.strip().startswith("#encoding") or line.strip().startswith("#-*-"):#不统计代码开头
                    line_count += 1
                elif line.strip().startswith('"""') and line.strip().endswith('"""') and line.strip() != '"""':#不统计多行备注
                    continue
                elif line.strip().startswith("'''") and line.strip().endswith("'''") and line.strip() != "'''":#不统计多行备注
                    continue
                elif line.strip().startswith("#"):#不统计备注
                    continue
                elif line.strip().startswith("'''") and flag == True:
                    flag = False
                    continue
                elif line.strip().startswith('"""') and flag == True:
                    flag = False
                    continue
                else:
                    line_count += 1
    return line_count
    
def count_code_lines(path,file_types=[]): #统计一个路径下多个文件的代码行数
    if not os.path.exists(path):
        print("您输入的目录或者文件路径不存在")
        return 0
    line_count =0
    file_lines_dict ={}
    if os.path.isfile(path):
       
        file_type = os.path.splitext(path)[1][1:]
        
        if len(file_types)==0:
            file_types=["py","cpp","c","java","ruby","ini","go","html","css","js","txt","vbs","php","asp","sh"]
        if file_type in file_types:
            line_count=count_file_lines(path)       
        return line_count
    else:
        file_path = []
        for root,dirs,files in os.walk(path):
            for file in files:
                file_path.append(os.path.join(root,file))

        for f in file_path:                
            file_type = os.path.splitext(f)[1][1:]
            if len(file_types)==0:
                file_types=["py","cpp","c","java","ruby","ini","go","html","css","js","txt","vbs","php","asp","sh"]
            if file_type not in file_types:
                continue
            print (f)
            
            line_num=count_file_lines(f)
            print(line_num)
            line_count+=line_num
            file_lines_dict[f]= line_num
           
        return line_count,file_lines_dict
                


if __name__ == "__main__":
    print (sys.argv)
    if len(sys.argv) <2:
        print ("请输入待统计行数的代码绝对路径！")
        sys.exit()
    count_path = sys.argv[1]
    file_types = []
    if len(sys.argv) >2:
        for i in sys.argv[2:]:
            file_types.append(i)

print (count_path,file_types)
print(count_code_lines(count_path,file_types))
#print(count_file_lines("D:\\python-2018-06-29\\exercise\\first-one-2018-07-15\\json1.py"))