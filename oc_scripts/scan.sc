import $file.workflow
import $file.utils

def executeSP(cpg: Cpg, resultFile: String) = {
	cpg.finding.p |> resultFile
	cpg.finding.toJsonPretty |> resultFile.replace(".md", ".json")
}

@doc("")
@main def execute(payload: String, payloadType: String, resultFile: String, graphsDir: String) : Boolean = {
    if(workflow.creatingCpg(payload,payloadType)) {
    	executeSP(cpg, resultFile)
    	printf("[✔] Saved results to %s\n", resultFile)
	}
	return true
}
