from .LAKE_ERROR_LIST import LAKE_ERROR
def requiredFields(fields, body):
    err = LAKE_ERROR("FIELD_REQUIRED")
    error_required_fields = {}
    for i in fields:
        if i not in body:
            error_required_fields[i] = err.getMessage()
    return error_required_fields, err.getStatus()


def remove_duplicates(j):
    p = set()
    for i in j:
        p.add(i)
    return list(p)